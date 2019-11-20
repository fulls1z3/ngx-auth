import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

import { authFactory, AuthModule } from '../src';
import { AuthLoader } from '../src/auth.loader';

import { MockBackendInterceptor } from './mocks/backend-interceptor.mock';
import { MockJwtInterceptor } from './mocks/jwt-interceptor.mock';

export * from './mocks/backend-interceptor.mock';
export * from './mocks/jwt-interceptor.mock';

export const MOCK_AUTH_PATH = new InjectionToken<string>('MOCK_AUTH_PATH');

@NgModule({
  imports: [HttpClientTestingModule],
  exports: [AuthModule],
  providers: [
    {
      provide: MOCK_AUTH_PATH,
      useValue: '/api/authenticate'
    },
    {
      provide: AuthLoader,
      useFactory: authFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockBackendInterceptor,
      deps: [MOCK_AUTH_PATH],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockJwtInterceptor,
      deps: [AuthLoader],
      multi: true
    }
  ]
})
export class AuthTestingModule {
  static withParams(
    configuredProvider: any = {
      provide: AuthLoader,
      useFactory: authFactory
    },
    path: string
  ): ModuleWithProviders {
    return {
      ngModule: AuthTestingModule,
      providers: [
        configuredProvider,
        {
          provide: MOCK_AUTH_PATH,
          useValue: path
        }
      ]
    };
  }
}
