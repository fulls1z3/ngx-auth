import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { AuthServerGuard } from './auth-server.guard';
import { AuthServerService } from './auth-server.service';
import { AuthGuard } from './auth.guard';
import { AuthLoader, AuthStaticLoader } from './auth.loader';
import { AuthService } from './auth.service';
import { AuthSettings } from './models/auth-settings';

export const AUTH_FORROOT_GUARD = new InjectionToken('AUTH_FORROOT_GUARD');

export const authFactory = () => new AuthStaticLoader();

// @dynamic
@NgModule({
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: AuthLoader,
      useFactory: authFactory
    }
  ]
})
export class AuthModule {
  static forRoot(
    configuredProvider: any = {
      provide: AuthLoader,
      useFactory: authFactory
    }
  ): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [configuredProvider]
    };
  }

  static forChild(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule
    };
  }

  static forServer(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AuthService,
          useClass: AuthServerService
        },
        {
          provide: AuthGuard,
          useClass: AuthServerGuard
        }
      ]
    };
  }

  // tslint:disable-next-line
  constructor(@Optional() @Inject(AUTH_FORROOT_GUARD) guard: any) {
    // NOTE: inject token
  }
}

export const provideForRootGuard = (settings?: AuthSettings) => {
  if (settings) {
    throw new Error('AuthModule.forRoot() already called. Child modules should use AuthModule.forChild() instead.');
  }

  return 'guarded';
};
