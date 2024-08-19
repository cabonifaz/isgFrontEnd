import { Component, OnInit } from '@angular/core';
import { MachineEventResponse } from "../../shared/models/machine.interface";
import { saveAs } from "file-saver";
import { HeaderService } from "../../shared/components/layout/header/header.service";
import { MachineService } from "../../services/machine/machine.service";
import { formatDate } from "@angular/common";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";

@Component({
  selector: 'app-machine-events',
  templateUrl: './machine-events.component.html',
  styleUrls: ['./machine-events.component.css'],
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

      :host ::ng-deep .p-button-primary {
        background-color: #ff7600;
        border-color: #ff7600;
      }

      :host ::ng-deep .p-button-primary:hover {
        background-color: #ff5500;
        border-color: #ff5500;
      }

      :host ::ng-deep .p-button-primary:focus {
        background-color: #ff5500;
        border-color: #ff5500;
        box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #ff9b33, 0 1px 2px 0 black;
      }

      :host ::ng-deep .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
        border-radius: 0.75rem;
        background: #ffe5ca;
        color: #d8601d;
        border-color: #ff9b33;
      }

      :host ::ng-deep .p-paginator:hover .p-paginator-pages:hover .p-paginator-page:hover {
        border-radius: 0.75rem;
        background: #FFE5CA;
        color: #D8601D;
        border-color: #FF9B33;
      }
    `
  ],
})
export class MachineEventsComponent implements OnInit {
  machineId: number = 0;
  machineEvents!: MachineEventResponse;
  desde: Date = new Date();
  hasta: Date = new Date();
  filter = {
    fechaDesde: '',
    fechaHasta: '',
    horaDesde: '',
    horaHasta: '',
    idEquipo: 0
  }

  first: number = 0;
  rows: number = 0;

  constructor(
    private messageService: MessageService,
    private headerService: HeaderService,
    private machineService: MachineService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.headerService.setTitle(this.machineService.nombreEquipo);
    this.headerService.setBackTo("/main");
    this.machineId = this.machineService.idEquipo;
    this.filter.idEquipo = this.machineId;
    this.machineId != 0 ? this.getEvents() : this.router.navigate(['/main']);
  }

  getEvents() {
    this.machineService.getMachineEvents(this.filter).subscribe(
      machineEvents => {
        this.machineEvents = machineEvents;
        this.rows = 5;
      }
    );
  }

  clearTable(): void {
    this.machineEvents.eventos = [];
    this.rows = 0;
    this.first = 0;
  }

  setDates(): void {
    if (this.desde && this.hasta && this.desde.getTime() < this.hasta.getTime()) {
      this.filter = {
        fechaDesde: formatDate(this.desde, 'yyyy-MM-dd', 'en-US'),
        fechaHasta: formatDate(this.hasta, 'yyyy-MM-dd', 'en-US'),
        horaDesde: formatDate(this.desde, 'HH:mm:ss', 'en-US'),
        horaHasta: formatDate(this.hasta, 'HH:mm:ss', 'en-US'),
        idEquipo: this.machineId,
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La fecha de inicio debe ser anterior a la de fin'
      });
    }
  }

  exportExcel(): void {
    let data: {
      EQUIPO: string;
      MODELO: string;
      SERIE: string;
      MOLDE: string;
      TIPO_EVENTO: string;
      FECHA: string;
      HORA: string;
      CANTIDAD: number;
    }[] = [];
    this.machineEvents.eventos.forEach(event => {
      data.push({
        'EQUIPO': this.machineEvents.equipoInfo.nombreEquipo,
        'MODELO': this.machineEvents.equipoInfo.modelo,
        'SERIE': this.machineEvents.equipoInfo.serie,
        'MOLDE': event.molde,
        'TIPO_EVENTO': event.tipoEvento,
        'FECHA': event.fecha.toString(),
        'HORA': event.hora,
        'CANTIDAD': event.cantidad
      });
    });
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'EVENTOS': worksheet }, SheetNames: ['EVENTOS'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "EVENTOS");
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

  next(): void {
    if (!this.isLastPage()) {
      this.first = this.first + this.rows;
    }
  }

  prev(): void {
    if (!this.isFirstPage()) {
      this.first = this.first - this.rows;
    }
  }

  isLastPage(): boolean {
    return this.machineEvents.eventos ? this.first + this.rows >= this.machineEvents.eventos.length : true;
  }

  isFirstPage(): boolean {
    return this.machineEvents.eventos ? this.first === 0 : true;
  }
}
