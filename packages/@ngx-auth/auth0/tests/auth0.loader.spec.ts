import { TestBed } from '@angular/core/testing';
import { AuthLoader } from '@ngx-auth/core';

import { Auth0Service, Auth0StaticLoader } from '../src';

import { testModuleConfig, testSettings } from './common';

describe('@ngx-auth/auth0:', () => {
  beforeEach(() => {
    const auth0Factory = () => new Auth0StaticLoader();

    testModuleConfig({
      provide: AuthLoader,
      useFactory: auth0Factory
    });
  });

  describe('Auth0StaticLoader', () => {
    it('should be able to provide `Auth0StaticLoader`', () => {
      const auth = TestBed.get(Auth0Service);

      expect(Auth0StaticLoader).toBeDefined();
      expect(auth.loader).toBeDefined();
      expect(auth.loader instanceof Auth0StaticLoader).toBeTruthy();
    });

    it('should be able to return the default auth0Settings', () => {
      const loader = new Auth0StaticLoader();

      expect(loader.backend.domain).toEqual('');
      expect(loader.backend.clientID).toEqual('');
      expect(loader.backend.scope).toEqual('openid');
      expect(loader.backend.responseType).toEqual('token id_token');
      expect(loader.storage).toEqual(testSettings.storage);
      expect(loader.storageKey).toEqual(testSettings.storageKey);
      expect(loader.loginRoute).toEqual(testSettings.publicRoute);
      expect(loader.publicRoute).toEqual(testSettings.publicRoute);
      expect(loader.defaultUrl).toEqual(testSettings.defaultUrl);
    });

    it('should be able to return custom auth0Settings', () => {
      const loader = new Auth0StaticLoader(testSettings);

      expect(loader.backend).toEqual(testSettings.backend);
      expect(loader.storage).toEqual(testSettings.storage);
      expect(loader.storageKey).toEqual(testSettings.storageKey);
      expect(loader.loginRoute).toEqual(testSettings.publicRoute);
      expect(loader.publicRoute).toEqual(testSettings.publicRoute);
      expect(loader.defaultUrl).toEqual(testSettings.defaultUrl);
    });
  });
});
