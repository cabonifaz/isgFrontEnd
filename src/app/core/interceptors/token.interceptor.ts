import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {HeaderService} from "../../shared/components/layout/header/header.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private excludedUrls: string[] = [
    'https://jazi2uqtnj.execute-api.us-east-2.amazonaws.com/isg/auth/login'
  ];

  constructor(
    private router: Router,
    private headerService: HeaderService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldExclude = this.excludedUrls.some(url => request.url.includes(url));
    if (shouldExclude) {
      return next.handle(request);
    }

    let token = sessionStorage.getItem('token');

    let intReq = request;
    if (token != null) {
      intReq = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }

    return next.handle(intReq);
  }
}
