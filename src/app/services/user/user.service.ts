import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserFilterRequest, UserRequest, UserResponse, UsersResponse} from "../../shared/models/user.interface";
import {USER_API_ENDPOINTS} from "../../core/global/constants/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uri = environment.url;

  constructor(private httpClient: HttpClient) {
  }

  getUsers(userFilterRequest: UserFilterRequest): Observable<UsersResponse> {
    return this.httpClient.post<UsersResponse>(
      `${this.uri}/${USER_API_ENDPOINTS.GET_USERS}`, userFilterRequest
    );
  }

  addUser(newUserRequet: UserRequest) {
    this.httpClient.post(`${this.uri}/${USER_API_ENDPOINTS.GET_USERS}`, newUserRequet);
  }

  getUserById(id: number): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(
      `${this.uri}/${USER_API_ENDPOINTS.GET_USER_BY_ID}`,
      {
        idUsuario: id
      });
  }


}
