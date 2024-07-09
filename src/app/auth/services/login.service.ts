import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { LOGIN_API_ENDPOINTS } from 'src/app/core/global/constants/api-endpoints';
import { UserService } from 'src/app/services/user/user.service';
import { LoginRequest, LoginResponse } from 'src/app/shared/models/login.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private uri = environment.url;
  private token = 'token';
  private readonly userKey = 'user_data';
  constructor(private http: HttpClient, private router: Router, private messageService: MessageService, private userService: UserService) {
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    // console.log('credenciales: ', credentials);
    return this.http.post<LoginResponse>(`${this.uri}/${LOGIN_API_ENDPOINTS.LOGIN}`, loginRequest)
      .pipe(tap(loginResponse => {
        sessionStorage.setItem(this.token, loginResponse.token);
      }))
  }

  public isLoggedIn(): boolean {
    let token = sessionStorage.getItem(this.token);
    return token != null && token.length > 0;
  }

  logout(): void {
    sessionStorage.clear();
    this.messageService.add({ severity: 'info', summary: 'Hasta luego', detail: 'Vuelve pronto', life: 2500 });
    this.router.navigate(['/login']);
  }
}
