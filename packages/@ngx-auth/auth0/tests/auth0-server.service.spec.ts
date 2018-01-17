// angular
import { async, inject } from '@angular/core/testing';

// module
import { Auth0Service } from '../index';
import { Auth0ServerService } from '../src/auth0-server.service';
import { testServerModuleConfig } from './common';

describe('@ngx-auth/auth0:',
  () => {
    beforeEach(testServerModuleConfig);

    describe('Auth0ServerService',
      () => {
        beforeEach(inject([Auth0Service],
          (auth: Auth0Service) => {
            auth.invalidate();
          }));

        it('is defined',
          inject([Auth0Service],
            (auth: Auth0Service) => {
              auth.authorize();

              expect(Auth0Service).toBeDefined();
              expect(auth).toBeDefined();
              expect(auth instanceof Auth0ServerService).toBeTruthy();
            }));

        it('should be able to return an undefined `defaultUrl`',
          inject([Auth0Service],
            (auth: Auth0Service) => {
              const res = auth.defaultUrl;
              expect(res).toBeUndefined();
            }));

        it('should not authenticate',
          async(inject([Auth0Service],
            (auth: Auth0Service) => {
              auth.authenticate()
                .subscribe(res => {
                  expect(res).toEqual(false);

                  const accessToken = auth.accessToken;
                  expect(accessToken).toBeUndefined();

                  const idToken = auth.idToken;
                  expect(idToken).toBeUndefined();

                  const expiresAt = auth.expiresAt;
                  expect(expiresAt).toBeUndefined();

                  const isAuthenticated = auth.isAuthenticated;
                  expect(isAuthenticated).toEqual(false);

                  const isAuthenticated$ = auth.isAuthenticated$;
                  isAuthenticated$.subscribe(isAuth => {
                    expect(isAuth).toEqual(false);
                  });
                });
            })));
      });
  });
