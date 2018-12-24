import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  constructor(private readonly path: string) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.split('?')[0].endsWith(this.path) && request.method === 'POST') {
      const testUser: any = {
        username: 'valid',
        password: 'valid'
      };

      const body = JSON.parse(request.body);

      if (body.username === testUser.username && body.password === testUser.password) {
        return observableOf(
          new HttpResponse({
            status: 200,
            body: { token: 'fake-jwt-token' }
          })
        );
      } else {
        return observableOf(new HttpResponse({ status: 401 }));
      }
    }

    return next.handle(request);
  }
}
