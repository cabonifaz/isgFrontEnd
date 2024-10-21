import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoleResponse} from "../../shared/models/role.interface";
import {PARAMETER_API_ENDPOINTS, ROLE_API_ENDPOINTS} from "../../core/global/constants/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  private uri = environment.url;

  constructor(private httpClient: HttpClient) {
  }

  getLinksDownload(): Observable<any> {
    return this.httpClient.get<any>(`${this.uri}/${PARAMETER_API_ENDPOINTS.GET_LINKS}`);
  }
}
