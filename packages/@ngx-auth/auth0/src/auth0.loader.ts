// libs
import { AuthLoader } from '@ngx-auth/core';

// module
import { Auth0Backend } from './models/auth0-backend';
import { Auth0Settings } from './models/auth0-settings';

export class Auth0StaticLoader implements AuthLoader {
  get backend(): Auth0Backend {
    return this.providedSettings.backend;
  }

  get storage(): any {
    return this.providedSettings.storage;
  }

  get storageKey(): string {
    return this.providedSettings.storageKey;
  }

  get loginRoute(): Array<any> {
    return this.providedSettings.publicRoute;
  }

  get publicRoute(): Array<any> {
    return this.providedSettings.publicRoute;
  }

  get defaultUrl(): string {
    return this.providedSettings.defaultUrl;
  }

  constructor(private readonly providedSettings: Auth0Settings = {
    backend: {
      domain: '',
      clientID: '',
      scope: 'openid',
      responseType: 'token id_token'
    },
    storage: localStorage,
    storageKey: 'currentUser',
    publicRoute: ['public'],
    defaultUrl: ''
  }) {
  }
}
