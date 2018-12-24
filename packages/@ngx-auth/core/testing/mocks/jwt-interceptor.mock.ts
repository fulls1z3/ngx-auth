import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthLoader } from '../../src/auth.loader';

@Injectable()
export class MockJwtInterceptor implements HttpInterceptor {
  constructor(private readonly loader: AuthLoader) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(this.loader.storage.getItem(this.loader.storageKey)).token;
    const intercepted = token
      ? request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      : request;

    return next.handle(intercepted);
  }
}
