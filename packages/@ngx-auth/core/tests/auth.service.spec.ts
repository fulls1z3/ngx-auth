// angular
import { inject, TestBed } from '@angular/core/testing';

// module
import { AuthLoader, AuthService, AuthStaticLoader } from '../index';
import { TestBootstrapComponent, testModuleConfig, testSettings } from './common';

describe('@ngx-auth/core:',
  () => {
    beforeEach(() => {
      const authFactory = () => new AuthStaticLoader(testSettings);

      testModuleConfig({
        provide: AuthLoader,
        useFactory: (authFactory)
      });
    });

    describe('AuthService',
      () => {
        beforeEach(inject([AuthService],
          (auth: AuthService) => {
            auth.invalidate();
          }));

        it('is defined',
          inject([AuthService],
            (auth: AuthService) => {
              expect(AuthService)
                .toBeDefined();
              expect(auth)
                .toBeDefined();
              expect(auth instanceof AuthService)
                .toBeTruthy();
            }));

        it('should be able to return the `defaultUrl`',
          inject([AuthService],
            (auth: AuthService) => {
              const res = auth.defaultUrl;
              expect(res)
                .toEqual('');
            }));

        it('should be able to authenticate w/valid combination',
          inject([AuthService],
            (auth: AuthService) => {
              const fixture = TestBed.createComponent(TestBootstrapComponent);
              fixture.detectChanges();

              auth.authenticate('valid', 'valid')
                .subscribe(res => {
                  expect(res)
                    .toEqual(true);

                  const token = auth.token;
                  expect(token)
                    .toBeDefined();

                  const redirectUrl = auth.redirectUrl;
                  expect(redirectUrl)
                    .toBeUndefined();

                  const isAuthenticated = auth.isAuthenticated;
                  expect(isAuthenticated)
                    .toEqual(true);
                });
            }));

        it('should not authenticate w/o valid combination',
          inject([AuthService],
            (auth: AuthService) => {
              const fixture = TestBed.createComponent(TestBootstrapComponent);
              fixture.detectChanges();

              auth.authenticate('invalid', 'invalid')
                .subscribe(res => {
                  expect(res)
                    .toEqual(false);

                  const token = auth.token;
                  expect(token)
                    .toBeUndefined();

                  const redirectUrl = auth.redirectUrl;
                  expect(redirectUrl)
                    .toBeUndefined();

                  const isAuthenticated = auth.isAuthenticated;
                  expect(isAuthenticated)
                    .toEqual(false);
                });
            }));
      });
  });
