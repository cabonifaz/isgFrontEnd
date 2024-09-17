import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from '../loader/loader.service';

interface ResponseBody {
  error?: string;
  errorMessage?: string;
}

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

  constructor(private route: Router, private loader: LoaderService, private messageService: MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.showLoader();
    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        const body = event.body as ResponseBody;
        if (body && body.error === 'true' && body.errorMessage) {
          throw new Error(body.errorMessage);
        }
      }
    })).pipe(catchError((error: any) => {
      console.log("Error con codigo: " + error.status + "\n Mensaje: " + error.message + "\n Error: " + error);

      switch (error.status) {
        case 0:
          this.messageService.add({ severity: 'error', summary: 'Error servidor', detail: 'Error de conexión con el servidor Backend', life: 2000 });
          break;
        case 400:
          let detail400 = error.error.message || error.error;
          let summary400 = 'Advertencia';
          if (detail400 === 'Los datos ingresados ya se encuentran registrados') {
            summary400 = 'Advertencia';
          } else if (detail400 === 'El nombre de usuario y/o la contraseña no son válidos') {
            summary400 = 'Error';
          }
          this.messageService.add({ severity: 'warn', summary: summary400, detail: detail400, life: 2000 });
          break;
        case 401:
          let detail401 = error.error.message || 'No autorizado';
          this.messageService.add({ severity: 'warn', summary: 'Error de inicio de sesión', detail: detail401, life: 2000 });
          if (detail401 !== 'No autorizado') {
            this.route.navigate(['/login']);
          }
          break;
        case 404:
          let detail404 = error.error.message || error.error.error || 'No se encontraron registros';
          this.messageService.add({ severity: 'info', summary: 'Información', detail: detail404, life: 2000 });
          return throwError(() => error);
        case 500:
          let detail500 = error.error.message || error.error.error || 'Error interno del servidor';
          this.messageService.add({ severity: 'error', summary: 'Error 500', detail: detail500, life: 2000 });
          return throwError(() => error);
        default:
          return EMPTY;
      }

      return EMPTY;
    }),
      finalize(() => this.loader.hideLoader())
    );
  }
}
