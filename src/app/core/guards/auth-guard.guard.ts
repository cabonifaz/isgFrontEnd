import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { LoginService } from 'src/app/auth/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Necesitas iniciar sesión', life: 2500 });
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
