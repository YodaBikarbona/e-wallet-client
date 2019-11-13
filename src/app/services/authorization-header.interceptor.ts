import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({providedIn: 'root'})
export class JWTHeaderInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getToken()
    if (token) {
      req = req.clone({headers : new HttpHeaders({
      'Authorization': token,
      'Lang': localStorage.getItem('lang')
        })});
      //req = req.clone({headers: new HttpHeaders().set('Authorization', token)});
    }
    return next.handle(req);
  }
}


