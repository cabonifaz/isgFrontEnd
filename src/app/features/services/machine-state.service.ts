import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { MachineService } from 'src/app/services/machine/machine.service';
import { EditMachineResponse, Equipo, MachineResponse } from 'src/app/shared/models/machine.interface';


@Injectable({
  providedIn: 'root'
})
export class MachineStateService {

  private machineSubject: BehaviorSubject<MachineResponse> = new BehaviorSubject<MachineResponse>({} as MachineResponse);
  machines$: Observable<MachineResponse> = this.machineSubject.asObservable();

  constructor(private machineService: MachineService) { }

  loadProducts(idTipoEquipo: number, equipo: string): void {
    this.machineService.getMachines(idTipoEquipo, equipo).subscribe((machine: MachineResponse) => {
      this.machineSubject.next(machine);
    });
  }

  updateMachine(nombreEquipo: string, idEquipo: number, serieEquipo: string): Observable<EditMachineResponse> {
    return this.machineService.editMachine(idEquipo, nombreEquipo, serieEquipo).pipe(
      tap(() => {
        const currentValue = this.machineSubject.getValue();
        const updatedValue = {
          ...currentValue,
          equipos: currentValue.equipos.map(equipo =>
            equipo.idEquipo === idEquipo ? { ...equipo, nombreEquipo: nombreEquipo, serie: serieEquipo } : equipo
          )
        };
        this.machineSubject.next(updatedValue);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  disableMachine(idEquipo: number): Observable<EditMachineResponse> {
    return this.machineService.disableMachine(idEquipo).pipe(
      tap(() => {
        const currentValue = this.machineSubject.getValue();
        const updatedValue = {
          ...currentValue,
          equipos: currentValue.equipos.map(equipo =>
            equipo.idEquipo === idEquipo ? { ...equipo, idEstadoRegistro: 0 } : equipo
          ).filter(equipo => equipo.idEstadoRegistro !== 0) // Filtra para excluir equipos con idEstadoRegistro 0
        };
        this.machineSubject.next(updatedValue);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
