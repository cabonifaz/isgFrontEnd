import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NOTIFICATION_API_ENDPOINTS, PARAMETER_API_ENDPOINTS} from "../../core/global/constants/api-endpoints";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private uri = environment.url;

  public idEquipo = 0;
  public nombreEquipo = '';

  setIdEquipo(idEquipo: number, nombreEquipo: string) {
    this.idEquipo = idEquipo;
    this.nombreEquipo = nombreEquipo;
  }

  constructor(private httpClient: HttpClient) {
  }

  getListNotifications(idEquipo: number): Observable<any> {
    return this.httpClient.post<any>(`${this.uri}/${NOTIFICATION_API_ENDPOINTS.LST_NOTIFICATIONS}`, {
      idEquipo: idEquipo
    });
  }
}
