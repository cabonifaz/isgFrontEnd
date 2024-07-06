import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {LOGIN_API_ENDPOINTS} from 'src/app/core/global/constants/api-endpoints';
import {LoginRequest, LoginResponse} from 'src/app/shared/models/login.interface';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private uri = environment.url;
  private readonly token = 'user_data';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    // console.log('credenciales: ', credentials);
    return this.http.post<LoginResponse>(`${this.uri}/${LOGIN_API_ENDPOINTS.LOGIN}`, loginRequest)
      .pipe(tap(loginResponse => {
        sessionStorage.setItem('token', loginResponse.token);
      }))
  }
}
