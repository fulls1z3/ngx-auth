// angular
import { ModuleWithProviders, NgModule, OpaqueToken } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// module
import { AuthModule } from '../index';
import { fakeBackendFactory } from './mocks/auth-backend.mock';

export * from './mocks/auth-backend.mock';

export const MOCK_AUTH_PATH = new OpaqueToken('MOCK_AUTH_PATH');

@NgModule({
  exports: [AuthModule],
  providers: [
    {
      provide: MOCK_AUTH_PATH,
      useValue: '/api/authenticate'
    },
    {
      provide: Http,
      useFactory: fakeBackendFactory,
      deps: [
        MockBackend,
        BaseRequestOptions,
        MOCK_AUTH_PATH
      ]
    },
    MockBackend,
    BaseRequestOptions
  ]
})
export class AuthTestingModule {
  static withPath(path: string): ModuleWithProviders {
    return {
      ngModule: AuthTestingModule,
      providers: [
        {
          provide: MOCK_AUTH_PATH,
          useValue: path
        }
      ]
    };
  }
}
