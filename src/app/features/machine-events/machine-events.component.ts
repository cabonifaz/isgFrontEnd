import { Component, OnInit } from '@angular/core';
import { MachineEventResponse } from "../../shared/models/machine.interface";
import { saveAs } from "file-saver";
import { HeaderService } from "../../shared/components/layout/header/header.service";
import { MachineService } from "../../services/machine/machine.service";
import { formatDate } from "@angular/common";
import { LazyLoadEvent, MessageService } from "primeng/api";
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
  // Inicializamos machineEvents
  machineEvents: MachineEventResponse = {
    equipoInfo: {
      nombreEquipo: "",
      idEquipo: 0,
      serie: "",
      modelo: "",
      idTipoEquipo: 0,
      tipoEquipo: "",
      moldeActual: ""
    },
    eventos: [],
    total: 0
  };

  desde: Date = new Date(new Date().getTime() - 10 * 60000);
  hasta: Date = new Date(new Date().getTime() + 10 * 60000);
  protected readonly formatDate = formatDate;
  filter = {
    fechaDesde: formatDate(this.desde, 'yyyy-MM-dd', 'en-US'),
    fechaHasta: formatDate(this.hasta, 'yyyy-MM-dd', 'en-US'),
    horaDesde: formatDate(this.desde, 'HH:mm:ss', 'en-US'),
    horaHasta: formatDate(this.hasta, 'HH:mm:ss', 'en-US'),
    idEquipo: 0,
    nHoja: 1,
    cHoja: null
  }

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
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
      {
        next: machineEvents => {
          this.machineEvents = machineEvents;
          this.totalRecords = this.machineEvents.total;
        },
        error: error => {
          console.error(error);
          this.totalRecords = 0;
          if (error.status === 500) {
            this.router.navigate(['/main']);
          }
        }
      }
    );
  }

  loadEvents(event: LazyLoadEvent) {
    setTimeout(() => {
      if (this.machineEvents) {
        // this.machineEvents2 = this.machineEvents.slice(event.first, (event.first + event.rows));
      }
    }, 1000);
  }

  clearTable(): void {
    this.machineEvents.eventos = [];
    this.rows = 10;
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
        nHoja: 1,
        cHoja: null
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
    const exportFilter = { ...this.filter, cHoja: 0, nHoja: 0 };
    this.machineService.getMachineEvents(exportFilter).subscribe(
      {
        next: machineEvents => {
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
          machineEvents.eventos.forEach(event => {
            data.push({
              'EQUIPO': machineEvents.equipoInfo.nombreEquipo,
              'MODELO': machineEvents.equipoInfo.modelo,
              'SERIE': machineEvents.equipoInfo.serie,
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
        },
        error: error => {
          console.error(error);
        }
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


  setPage(page: number) {
    this.filter.nHoja = page; // Actualiza la página en el filtro
    this.first = (page - 1) * this.rows; // Calcula el índice `first` para la paginación
    this.getEvents(); // Realiza la consulta al servidor con la nueva página
  }

  next(): void {
    if (!this.isLastPage()) {
      this.setPage(this.filter.nHoja + 1); // Incrementa la página
    }
  }

  prev(): void {
    if (!this.isFirstPage()) {
      this.setPage(this.filter.nHoja - 1); // Decrementa la página
    }
  }

  handlePageChange(event: any) {
    this.filter.nHoja = Math.floor(event.first / this.rows) + 1; // Calcula la página correcta
    this.first = event.first; // Actualiza el índice first
    this.getEvents(); // Realiza la consulta al servidor con la nueva página
  }

  isLastPage(): boolean {
    return this.totalRecords <= this.first + this.rows;
  }

  isFirstPage(): boolean {
    return this.filter.nHoja === 1;
  }
}
