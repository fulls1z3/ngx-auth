import { Auth0Backend } from './auth0-backend';

export interface Auth0Settings {
  backend: Auth0Backend;
  storage: any;
  storageKey: string;
  publicRoute: Array<any>;
  defaultUrl: string;
}
