// angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

// libs
import { AuthGuard, AuthLoader, AuthServerGuard, AuthService } from '@ngx-auth/core';

// module
import { Auth0StaticLoader } from './src/auth0.loader';
import { Auth0Service } from './src/auth0.service';
import { Auth0ServerService } from './src/auth0-server.service';

export * from './src/models/auth0-backend';
export * from './src/models/auth0-settings';
export * from './src/auth0.loader';
export * from './src/auth0.service';

// for AoT compilation
export function auth0Factory(): AuthLoader {
  return new Auth0StaticLoader();
}

@NgModule({
  providers: [
    Auth0Service,
    {
      provide: AuthService,
      useClass: Auth0Service
    },
    {
      provide: AuthLoader,
      useFactory: (auth0Factory)
    }
  ]
})
export class Auth0Module {
  static forRoot(configuredProvider: any = {
    provide: AuthLoader,
    useFactory: (auth0Factory)
  }): ModuleWithProviders {
    return {
      ngModule: Auth0Module,
      providers: [
        configuredProvider
      ]
    };
  }

  static forServer(): ModuleWithProviders {
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

  constructor(@Optional() @SkipSelf() parentModule: Auth0Module) {
    if (parentModule)
      throw new Error('Auth0Module already loaded; import in root module only.');
  }
}
