import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {MachineService} from 'src/app/services/machine/machine.service';
import {
  EditMachineResponse,
  MachineBaseResponse,
  MachineResponse
} from 'src/app/shared/models/machine.interface';


@Injectable({
  providedIn: 'root'
})
export class MachineStateService {

  private machineSubject: BehaviorSubject<MachineResponse> = new BehaviorSubject<MachineResponse>({
    equipos: [],
    totalCount: 0
  });
  machines$: Observable<MachineResponse> = this.machineSubject.asObservable();

  constructor(private machineService: MachineService) {
  }

  loadProducts(idTipoEquipo: number, equipo: string): void {
    this.machineService.getMachines(idTipoEquipo, equipo).subscribe({
      next: (machine: MachineResponse) => {
        if (!machine || !machine.equipos || machine.equipos.length === 0) {
          this.machineSubject.next({equipos: [], totalCount: 0});
        } else {
          this.machineSubject.next(machine);
        }
      },
      error: () => {
        this.machineSubject.next({equipos: [], totalCount: 0});
      }
    });
  }


  updateMachine(nombreEquipo: string, idEquipo: number, modeloEquipo: string, limiteMax: number, limiteMin: number): Observable<MachineBaseResponse> {
    return this.machineService.editMachine(idEquipo, nombreEquipo, modeloEquipo, limiteMax, limiteMin).pipe(
      tap(() => {
        const currentValue = this.machineSubject.getValue();
        const updatedValue = {
          ...currentValue,
          equipos: currentValue.equipos.map(equipo =>
            equipo.idEquipo === idEquipo ? {...equipo, nombreEquipo: nombreEquipo, modelo: modeloEquipo} : equipo
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
            equipo.idEquipo === idEquipo ? {...equipo, idTipoEvento: 0} : equipo
          ).filter(equipo => equipo.idTipoEvento !== 0) // Filtra para excluir equipos con idEstadoRegistro 0
        };
        this.machineSubject.next(updatedValue);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
