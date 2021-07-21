import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthGuard, AuthLoader, AuthServerGuard, AuthService } from '@ngx-auth/core';

import { Auth0ServerService } from './auth0-server.service';
import { Auth0StaticLoader } from './auth0.loader';
import { Auth0Service } from './auth0.service';

export const auth0Factory = () => new Auth0StaticLoader();

// @dynamic
@NgModule({
  providers: [
    Auth0Service,
    {
      provide: AuthService,
      useClass: Auth0Service
    },
    {
      provide: AuthLoader,
      useFactory: auth0Factory
    }
  ]
})
export class Auth0Module {
  static forRoot(
    configuredProvider: any = {
      provide: AuthLoader,
      useFactory: auth0Factory
    }
  ): ModuleWithProviders<Auth0Module> {
    return {
      ngModule: Auth0Module,
      providers: [configuredProvider]
    };
  }

  static forServer(): ModuleWithProviders<Auth0Module> {
    return {
      ngModule: Auth0Module,
      providers: [
        {
          provide: Auth0Service,
          useClass: Auth0ServerService
        },
        {
          provide: AuthGuard,
          useClass: AuthServerGuard
        }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: Auth0Module) {
    if (parentModule) {
      throw new Error('Auth0Module already loaded; import in root module only.');
    }
  }
}
