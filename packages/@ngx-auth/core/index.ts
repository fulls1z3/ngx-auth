// angular
import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';

// module
import { AuthSettings } from './src/models/auth-settings';
import { AuthGuard } from './src/auth.guard';
import { AuthLoader, AuthStaticLoader } from './src/auth.loader';
import { AuthService } from './src/auth.service';

export * from './src/models/auth-settings';
export * from './src/models/backend';
export * from './src/auth.guard';
export * from './src/auth.loader';
export * from './src/auth.service';

export const AUTH_FORROOT_GUARD = new InjectionToken('AUTH_FORROOT_GUARD');

// for AoT compilation
export function authFactory(): AuthLoader {
  return new AuthStaticLoader();
}

@NgModule({
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: AuthLoader,
      useFactory: (authFactory)
    }
  ]
})
export class AuthModule {
  static forRoot(configuredProvider: any = {
    provide: AuthLoader,
    useFactory: (authFactory)
  }): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        configuredProvider
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: AuthModule
    };
  }

  constructor(@Optional() @Inject(AUTH_FORROOT_GUARD) guard: any) {
    // NOTE: inject token
  }
}

export function provideForRootGuard(settings: AuthSettings): any {
  if (settings)
    throw new Error(
      'AuthModule.forRoot() already called. Child modules should use AuthModule.forChild() instead.');

  return 'guarded';
}
