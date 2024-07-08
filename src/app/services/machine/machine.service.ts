import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MACHINE_API_ENDPOINTS } from 'src/app/core/global/constants/api-endpoints';
import { MachineResponse } from 'src/app/shared/models/machine.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private uri = environment.url;

  constructor(private httpClient: HttpClient) {
  }

  getMachines(idTipoEquipo: number, equipo: string): Observable<MachineResponse> {
    return this.httpClient.post<MachineResponse>(`${this.uri}/${MACHINE_API_ENDPOINTS.GET_MACHINES}`, {
      idTipoEquipo: idTipoEquipo,
      equipo: equipo
    });
  }
}
