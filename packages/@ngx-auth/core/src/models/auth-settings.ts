import { Backend } from './backend';

export interface AuthSettings {
  backend: Backend;
  storage: any;
  storageKey: string;
  loginRoute: Array<any>;
  defaultUrl: string;
}
