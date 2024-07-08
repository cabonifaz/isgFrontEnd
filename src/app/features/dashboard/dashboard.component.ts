import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { HeaderService } from "../../shared/components/layout/header/header.service";
import { Equipo, EquipoById, MachineResponse } from 'src/app/shared/models/machine.interface';
import { MachineService } from 'src/app/services/machine/machine.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/components/utils/Validations/CustomValidators';
import { MachineStateService } from '../services/machine-state.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  styles: [
    `
      :host ::ng-deep .p-datatable .p-datatable-header  {
          border-width: 1px 1px 0px 1px;
          background: #fff;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
      }
      :host ::ng-deep .p-datatable .p-paginator-bottom  {
          border-width: 0px 1px 1px 1px;
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
      }
      :host ::ng-deep .p-paginator .p-paginator-prev  {
          display: none;
      }
      :host ::ng-deep .p-paginator .p-paginator-next  {
          display: none;
      }
    `
  ],
  providers: [ConfirmationService]
})
export class DashboardComponent implements OnInit {
  equipment!: MachineResponse
  equipos: Equipo[] = [];
  selectedProducts!: Equipo[];
  visibleEditModal: boolean = false;
  editMachineForm!: FormGroup;
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
    this.getMachinesState();
    this.editMachineInitForm();
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
    })
  }

  getMachinesState() {
    this.machineStateService.loadProducts(1, '');
    this.getMachiesData();
  }

  editMachineInitForm() {
    this.editMachineForm = this.formBuilder.group({
      nombreModelo: ['', [CustomValidators.required, CustomValidators.minLength(3)]],
      modelo: ['', [CustomValidators.required, CustomValidators.minLength(3)]],
      serie: ['', [CustomValidators.required, CustomValidators.minLength(3)]],
      tipoEquipo: ['', [CustomValidators.required]]
    });
  }

  currentMachineId!: number;

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
        this.editMachineForm.get('modelo')?.disable();
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
    const idEquipo = this.currentMachineId;
    this.machineStateService.updateMachine(nombreEquipo, idEquipo).subscribe(
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
      acceptButtonStyleClass: 'p-button-danger',
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

  openModalEdit() {
    this.visibleEditModal = true;
    // this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  closeEditDialog() {
    this.visibleEditModal = false;
  }

  getSeverity(status: number) {
    switch (status) {
      case 1:
        return 'success';
      case 0:
        return 'danger';
      default:
        return 'info';
    }
  }
}
