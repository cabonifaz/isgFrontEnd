import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { HeaderService } from "../../shared/components/layout/header/header.service";
import { Equipo, EquipoById, MachineResponse } from 'src/app/shared/models/machine.interface';
import { MachineService } from 'src/app/services/machine/machine.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/components/utils/Validations/CustomValidators';
import { MachineStateService } from '../services/machine-state.service';
import { catchError, debounceTime, distinctUntilChanged, throwError } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserResponse } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
      :host ::ng-deep .p-paginator .p-paginator-pages .p-paginator-page {
        border-radius: 0.75rem;
        background: #ffe5ca;
        color: #d8601d;
        border-color: #ff9b33;
      }

      :host ::ng-deep .p-paginator .p-paginator-pages .p-paginator-page {
        border-radius: 0.75rem;
        background: #FFE5CA;
        color: #D8601D;
        border-color: #FF9B33;
      }

      :host ::ng-deep .p-paginator:hover .p-paginator-pages:hover .p-paginator-page:hover {
        border-radius: 0.75rem;
        background: #FFE5CA;
        color: #D8601D;
        border-color: #FF9B33;
      }
    `
  ],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
  providers: [ConfirmationService]
})
export class DashboardComponent implements OnInit {
  equipment!: MachineResponse
  equipos: Equipo[] = [];
  selectedProducts!: Equipo[];
  visibleEditModal: boolean = false;
  editMachineForm!: FormGroup;
  searchForm!: FormGroup;
  currentUser: UserResponse | null = null;
  currentMachineId!: number;

  first = 0;

  rows = 0;

  constructor(
    private headerService: HeaderService,
    private messageService: MessageService,
    private machineService: MachineService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private machineStateService: MachineStateService
  ) {
  }

  ngOnInit(): void {
    // Cargar título
    this.headerService.setTitle('Máquinas');
    this.headerService.setBackTo('');
    this.getMachinesState();
    this.editMachineInitForm();
    this.initSearchForm();
    this.subscribeToMachines();
    this.headerService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getMachiesData() {
    this.machineStateService.machines$.pipe(
      catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar las maquinas' });
        return throwError(() => error);
      })
    ).subscribe((machines: MachineResponse) => {
      // console.log(response);
      this.equipment = machines;
      this.equipos = machines.equipos;
      // this.rows = this.equipment.totalCount;
    })
  }

  subscribeToMachines(): void {
    this.machineStateService.machines$.pipe(
      catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar las máquinas' });
        return throwError(() => error);
      })
    ).subscribe((machines: MachineResponse) => {
      this.equipment = machines;
      this.equipos = machines.equipos;
    });
  }

  getMachinesState() {
    this.machineStateService.loadProducts(1, '');
    this.getMachiesData();
  }

  initSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      searchInput: ['']
    });

    this.searchForm.get('searchInput')!.valueChanges
      .pipe(
        debounceTime(800), // Agrega un retraso de 800ms
        distinctUntilChanged() // Evita llamadas a la API si el valor no ha cambiado
      )
      .subscribe(value => {
        if (value.length >= 3) {
          this.machineStateService.loadProducts(1, value);
        } else if (value.length === 0) {
          this.machineStateService.loadProducts(1, '');
        }
      });
  }

  editMachineInitForm() {
    this.editMachineForm = this.formBuilder.group({
      nombreModelo: ['', [CustomValidators.required, CustomValidators.minLength(2)]],
      modelo: ['', [CustomValidators.required, CustomValidators.minLength(3)]],
      serie: ['', [CustomValidators.required, CustomValidators.minLength(3)]],
      tipoEquipo: ['', [CustomValidators.required]]
    });
  }


  getMachineDataById(machine: EquipoById) {
    this.machineService.getMachineById(machine.idEquipo).subscribe(
      (response) => {
        this.currentMachineId = machine.idEquipo;
        this.editMachineForm.setValue({
          nombreModelo: response.nombreEquipo,
          modelo: response.modelo,
          serie: response.serie,
          tipoEquipo: response.descripcionTipoEquipo
        });
        this.editMachineForm.get('serie')?.disable();
        this.editMachineForm.get('tipoEquipo')?.disable();
        this.openModalEdit();
      }
    )
  }

  onUpdateMachine() {
    if (this.editMachineForm.invalid) {
      this.editMachineForm.markAllAsTouched();
      return;
    }
    const nombreEquipo = this.editMachineForm.get('nombreModelo')?.value;
    const modelo = this.editMachineForm.get('modelo')?.value;
    const idEquipo = this.currentMachineId;
    this.machineStateService.updateMachine(nombreEquipo, idEquipo, modelo).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: response.message });
        this.getMachiesData();
        this.closeEditDialog();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar la máquina' });
      }
    );
  }

  confirmDisable(idEquipo: number) {
    this.confirmationService.confirm({
      message: 'Estas seguro de querer deshabilitar esta máquina?',
      header: 'Confirmación de deshabilitación',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Deshabilitar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptButtonStyleClass: 'p-button-primary',
      accept: () => {
        this.machineStateService.disableMachine(idEquipo).subscribe(
          (response) => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message });
            this.getMachiesData();
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al deshabilitar la máquina.' });
          }
        );
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            // this.messageService.add({ severity: 'error', summary: 'Rechazada', detail: 'Has rechazado la eliminación' });
            break;
          case ConfirmEventType.CANCEL:
            // this.messageService.add({ severity: 'warn', summary: 'Cancelada', detail: 'Has cancelado la elimincación' });
            break;
        }
      }
    });
  }

  // next() {
  //   this.first = this.first + this.rows;
  // }

  // prev() {
  //   this.first = this.first - this.rows;
  // }

  // pageChange(event: any) {
  //   this.first = event.first;
  //   this.rows = event.rows;
  // }

  // isLastPage(): boolean {
  //   return this.equipos ? this.first === this.equipos.length - this.rows : true;
  // }

  // isFirstPage(): boolean {
  //   return this.equipos ? this.first === 0 : true;
  // }

  openModalEdit() {
    this.visibleEditModal = true;
  }

  closeEditDialog() {
    this.visibleEditModal = false;
    this.editMachineForm.reset();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'En Curso':
        return 'bg-span-success text-span-success';
      case 'Detenido':
        return 'bg-span-danger text-span-danger';
      case 'Sin señal':
        return 'bg-span-warning text-span-warning';
      default:
        return 'info';
    }
  }

  setEquipo(idEquipo: number, nombreEquipo: string): void {
    this.machineService.setEquipo(idEquipo, nombreEquipo);
  }
}
