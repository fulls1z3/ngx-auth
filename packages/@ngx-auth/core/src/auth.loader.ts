import { AuthSettings } from './models/auth-settings';
import { Backend } from './models/backend';

export abstract class AuthLoader {
  abstract get backend(): any;

  abstract get storage(): any;

  abstract get storageKey(): string;

  abstract get loginRoute(): Array<any>;

  abstract get defaultUrl(): string;
}

export class AuthStaticLoader implements AuthLoader {
  get backend(): Backend {
    return this.providedSettings.backend;
  }

  get storage(): any {
    return this.providedSettings.storage;
  }

  get storageKey(): string {
    return this.providedSettings.storageKey;
  }

  get loginRoute(): Array<any> {
    return this.providedSettings.loginRoute;
  }

  get defaultUrl(): string {
    return this.providedSettings.defaultUrl;
  }

  constructor(
    private readonly providedSettings: AuthSettings = {
      backend: {
        endpoint: '/api/authenticate',
        params: []
      },
      storage: localStorage,
      storageKey: 'currentUser',
      loginRoute: ['login'],
      defaultUrl: ''
    }
  ) {}
}
