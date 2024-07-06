import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { RoleResponse } from "../../shared/models/role.interface";
import { ROLE_API_ENDPOINTS } from "../../core/global/constants/api-endpoints";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private uri = environment.url;

  constructor(private httpClient: HttpClient) {
  }

  getRoles(): Observable<RoleResponse[]> {
    return this.httpClient.get<RoleResponse[]>(`${this.uri}/${ROLE_API_ENDPOINTS.GET_ROLES}`).pipe(
      tap(data => console.log('data: ', data)),
      catchError(err => {
        console.error('error: ', err);
        return throwError(err);
      })
    );
  }

}
