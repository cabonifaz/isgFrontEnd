import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  UpdatePasswordRequest,
  UpdateUserRequest,
  UserFilterRequest,
  UserRequest,
  UserResponse,
  UsersResponse
} from "../../shared/models/user.interface";
import {USER_API_ENDPOINTS} from "../../core/global/constants/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uri = environment.url;
  public userId: number = 0;

  constructor(private httpClient: HttpClient) {
  }

  setUserId(id: number): void {
    this.userId = id;
  }

  getUsers(usuarioFilterRequest: UserFilterRequest): Observable<UsersResponse> {
    return this.httpClient.post<UsersResponse>(
      `${this.uri}/${USER_API_ENDPOINTS.GET_USERS}`, usuarioFilterRequest
    );
  }

  addUser(usuarioRequest: UserRequest): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(`${this.uri}/${USER_API_ENDPOINTS.ADD_USER}`, usuarioRequest);
  }

  getUserById(id: number): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(
      `${this.uri}/${USER_API_ENDPOINTS.GET_USER_BY_ID}`,
      {
        idUsuario: id
      });
  }

  updateUser(updateUserRequest: UpdateUserRequest): Observable<{ message: string }> {
    return this.httpClient.put<{
      message: string
    }>(`${this.uri}/${USER_API_ENDPOINTS.UPDATE_USER}`, updateUserRequest);
  }

  updatePassword(updatePasswordRequest: UpdatePasswordRequest): Observable<{ message: string }> {
    return this.httpClient.put<{
      message: string
    }>(`${this.uri}/${USER_API_ENDPOINTS.UPDATE_PASSWORD}`, updatePasswordRequest);
  }


}
