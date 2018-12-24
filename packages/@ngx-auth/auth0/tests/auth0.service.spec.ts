import { async, inject, TestBed } from '@angular/core/testing';
import { AuthLoader } from '@ngx-auth/core';

import { Auth0Service, Auth0StaticLoader } from '../index';

import { TestBootstrapComponent, testModuleConfig, testSettings } from './common';

jest.mock('auth0-js');

describe('@ngx-auth/auth0:', () => {
  beforeEach(() => {
    const auth0Factory = () => new Auth0StaticLoader(testSettings);

    testModuleConfig({
      provide: AuthLoader,
      useFactory: auth0Factory
    });
  });

  describe('Auth0Service', () => {
    beforeEach(inject([Auth0Service], async (auth: Auth0Service) => auth.invalidate()));

    it('is defined', inject([Auth0Service], (auth: Auth0Service) => {
      auth.authorize();

      expect(Auth0Service).toBeDefined();
      expect(auth).toBeDefined();
      expect(auth instanceof Auth0Service).toBeTruthy();
    }));

    it('should be able to return the `defaultUrl`', inject([Auth0Service], (auth: Auth0Service) => {
      const res = auth.defaultUrl;
      expect(res).toEqual('');
    }));

    it('should be able to authenticate w/valid combination', async(
      inject([Auth0Service], (auth: Auth0Service) => {
        const fixture = TestBed.createComponent(TestBootstrapComponent);
        fixture.detectChanges();

        auth.authenticate().subscribe(res => {
          expect(res).toEqual(true);

          const accessToken = auth.accessToken;
          expect(accessToken).toBeDefined();

          const idToken = auth.idToken;
          expect(idToken).toBeDefined();

          const expiresAt = auth.expiresAt;
          expect(expiresAt).toBeDefined();

          const isAuthenticated = auth.isAuthenticated;
          expect(isAuthenticated).toEqual(true);
        });
      })
    ));

    it('should not authenticate w/o valid combination', async(
      inject([Auth0Service], (auth: Auth0Service) => {
        const fixture = TestBed.createComponent(TestBootstrapComponent);
        fixture.detectChanges();

        auth.authenticate().subscribe(res => {
          expect(res).toEqual(false);

          const accessToken = auth.accessToken;
          expect(accessToken).toBeUndefined();

          const idToken = auth.idToken;
          expect(idToken).toBeUndefined();

          const expiresAt = auth.expiresAt;
          expect(expiresAt).toBeUndefined();

          const isAuthenticated = auth.isAuthenticated;
          expect(isAuthenticated).toEqual(false);
        });
      })
    ));
  });
});
