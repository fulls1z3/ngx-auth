// angular
import { inject } from '@angular/core/testing';

// module
import { AuthService } from '../index';
import { AuthServerService } from '../src/auth-server.service';
import { testServerModuleConfig } from './common';

describe('@ngx-auth/core:',
  () => {
    beforeEach(testServerModuleConfig);

    describe('AuthServerService',
      () => {
        beforeEach(inject([AuthService],
          (auth: AuthService) => {
            auth.invalidate();
          }));

        it('is defined',
          inject([AuthService],
            (auth: AuthService) => {
              expect(AuthService).toBeDefined();
              expect(auth).toBeDefined();
              expect(auth instanceof AuthServerService).toBeTruthy();
            }));

        it('should be able to return an undefined `defaultUrl`',
          inject([AuthService],
            (auth: AuthService) => {
              const res = auth.defaultUrl;
              expect(res).toBeUndefined();
            }));

        it('should not authenticate',
          inject([AuthService],
            (auth: AuthService) => {
              auth.authenticate('valid', 'valid')
                .subscribe(res => {
                  expect(res).toEqual(false);

                  const token = auth.token;
                  expect(token).toBeUndefined();

                  auth.redirectUrl = 'testUrl';
                  const redirectUrl = auth.redirectUrl;
                  expect(redirectUrl).toBeUndefined();

                  const isAuthenticated = auth.isAuthenticated;
                  expect(isAuthenticated).toEqual(false);
                });
            }));
      });
  });
