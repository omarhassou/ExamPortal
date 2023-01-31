
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private login :LoginService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =this.login.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        
      }
    });
    return next.handle(request);
  }
}

export const AuthInterceptorProviders=[
    {
        provide :HTTP_INTERCEPTORS,
        useClasse:TokenInterceptor,
        multi:true
    },
];    