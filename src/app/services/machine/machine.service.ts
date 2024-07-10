import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MACHINE_API_ENDPOINTS} from 'src/app/core/global/constants/api-endpoints';
import {
  EditMachineResponse,
  EquipoById,
  MachineEventResponse,
  MachineResponse
} from 'src/app/shared/models/machine.interface';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private uri = environment.url;
  private idEquipo = new BehaviorSubject<number>(0);
  public idEquipo$ = this.idEquipo.asObservable();

  setIdEquipo(idEquipo: number) {
    this.idEquipo.next(idEquipo);
  }

  constructor(
    private httpClient: HttpClient) {
  }

  getMachines(idTipoEquipo: number, equipo: string): Observable<MachineResponse> {
    return this.httpClient.post<MachineResponse>(`${this.uri}/${MACHINE_API_ENDPOINTS.GET_MACHINES}`, {
      idTipoEquipo: idTipoEquipo,
      equipo: equipo
    });
  }

  getMachineById(idEquipo: number): Observable<EquipoById> {
    return this.httpClient.post<EquipoById>(`${this.uri}/${MACHINE_API_ENDPOINTS.GET_MACHINE_BY_ID}`, {
      idEquipo: idEquipo
    });
  }

  editMachine(idEquipo: number, nombreEquipo: string, modeloEquipo: string): Observable<EditMachineResponse> {
    return this.httpClient.put<EditMachineResponse>(`${this.uri}/${MACHINE_API_ENDPOINTS.EDIT_MACHINE}`, {
      idEquipo: idEquipo,
      nombreEquipo: nombreEquipo,
      modeloEquipo: modeloEquipo
    });
  }

  disableMachine(idEquipo: number): Observable<EditMachineResponse> {
    return this.httpClient.put<EditMachineResponse>(`${this.uri}/${MACHINE_API_ENDPOINTS.DISABLE_MACHINE}`, {
      idEquipo: idEquipo
    });
  }

  getMachineEvents(filter: {
    fechaDesde: string,
    fechaHasta: string,
    horaDesde: string,
    horaHasta: string,
    idEquipo: number
  }): Observable<MachineEventResponse> {
    return this.httpClient.post<MachineEventResponse>(`${this.uri}/${MACHINE_API_ENDPOINTS.GET_MACHINE_EVENTS}`, filter);
  }
}
