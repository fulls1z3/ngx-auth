// angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

// libs
import { Observable } from 'rxjs/Observable';

// module
import { AuthLoader } from '../../src/auth.loader';

@Injectable()
export class FakeJwtInterceptor implements HttpInterceptor {
  constructor(private readonly loader: AuthLoader) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.loader.storage.getItem(this.loader.storageKey);

    if (token)
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    return next.handle(request);
  }
}
