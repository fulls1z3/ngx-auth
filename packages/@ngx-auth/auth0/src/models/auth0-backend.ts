export interface Auth0Backend {
  domain: string;
  clientID: string;
  redirectUri?: string;
  scope?: string;
  audience?: string;
  responseType?: string;
  responseMode?: string;
}
