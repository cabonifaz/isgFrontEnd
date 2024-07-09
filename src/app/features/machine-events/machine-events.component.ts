import {Component, OnInit} from '@angular/core';
import {Equipo, MachineEventResponse} from "../../shared/models/machine.interface";
import {ActivatedRoute} from "@angular/router";
import {saveAs} from "file-saver";
import {HeaderService} from "../../shared/components/layout/header/header.service";
import {MachineService} from "../../services/machine/machine.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-machine-events',
  templateUrl: './machine-events.component.html',
  styles: [
    `
      :host ::ng-deep .p-datatable .p-datatable-header {
        border-width: 1px 1px 0px 1px;
        background: #fff;
        border-top-left-radius: 0.75rem;
        border-top-right-radius: 0.75rem;
      }

      :host ::ng-deep .p-datatable .p-paginator-bottom {
        border-width: 0px 1px 1px 1px;
        border-bottom-left-radius: 0.75rem;
        border-bottom-right-radius: 0.75rem;
      }

      :host ::ng-deep .p-paginator .p-paginator-prev {
        display: none;
      }

      :host ::ng-deep .p-paginator .p-paginator-next {
        display: none;
      }
    `
  ],
})
export class MachineEventsComponent implements OnInit {
  machineId: number = 14;
  machine!: Equipo;
  machineEvents!: MachineEventResponse;
  desde: Date = new Date();
  hasta: Date = new Date();
  filter = {
    fechaDesde: '',
    fechaHasta: '',
    horaDesde: '',
    horaHasta: '',
    idEquipo: this.machineId
  }

  constructor(
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private machineService: MachineService,
  ) {
  }

  ngOnInit(): void {
    this.getEvents();
    this.route.paramMap.subscribe(params => {
      this.machineId = +params.get('machine-id')!;
    });
    this.headerService.setTitle("Máquina 1");
  }

  getEvents() {
    this.machineService.getMachineEvents(this.filter).subscribe(machineEvents => {
      this.machineEvents = machineEvents;
    });
  }

  setDates(): void {
    this.filter = {
      fechaDesde: formatDate(this.desde, 'yyyy-MM-dd', 'en-US'),
      fechaHasta: formatDate(this.hasta, 'yyyy-MM-dd', 'en-US'),
      horaDesde: formatDate(this.desde, 'HH:mm:ss', 'en-US'),
      horaHasta: formatDate(this.hasta, 'HH:mm:ss', 'en-US'),
      idEquipo: 14
    }
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.machineEvents.eventos);
      const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, "products");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  protected readonly formatDate = formatDate;
}
