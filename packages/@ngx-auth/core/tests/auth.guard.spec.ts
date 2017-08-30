// angular
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

// module
import { AuthLoader, AuthService, AuthStaticLoader } from '../index';
import { mockAuthData, TestBootstrapComponent, testModuleConfig } from './index.spec';

describe('@ngx-auth/core:',
  () => {
    beforeEach(() => {
      const authFactory = () => new AuthStaticLoader();

      testModuleConfig({
        provide: AuthLoader,
        useFactory: (authFactory)
      });
    });

    describe('AuthGuard',
      () => {
        beforeEach(inject([AuthService],
          (auth: AuthService) => {
            auth.invalidate();
          }));

        it('should be able to `Activate` w/authentication',
          inject([Router, AuthLoader],
            (router: Router, loader: AuthLoader) => {
              const fixture = TestBed.createComponent(TestBootstrapComponent);
              fixture.detectChanges();

              loader.storage.setItem(loader.storageKey, mockAuthData);

              router.navigate(['/'])
                .then(() => {
                  expect(router.url).toEqual('/');

                  router.navigate(['/activate-page'])
                    .then(() => {
                      expect(router.url).toEqual('/activate-page');

                      router.navigate(['/activate-feature'])
                        .then(() => {
                          expect(router.url).toEqual('/activate-feature');
                        });
                    });
                });
            }));

        it('should not `Activate` w/o authentication',
          inject([Router],
            (router: Router) => {
              const fixture = TestBed.createComponent(TestBootstrapComponent);
              fixture.detectChanges();

              router.navigate(['/'])
                .then(() => {
                  expect(router.url).toEqual('/');

                  router.navigate(['/activate-page'])
                    .then(() => {
                      expect(router.url).toEqual('/');

                      router.navigate(['/activate-feature'])
                        .then(() => {
                          expect(router.url).toEqual('/');
                        });
                    });
                });
            }));

        it('should be able to `Load` w/authentication',
          inject([Router, AuthLoader],
            (router: Router, loader: AuthLoader) => {
              const fixture = TestBed.createComponent(TestBootstrapComponent);
              fixture.detectChanges();

              loader.storage.setItem(loader.storageKey, mockAuthData);

              router.navigate(['/'])
                .then(() => {
                  expect(router.url).toEqual('/');

                  router.navigate(['/load-page'])
                    .then(() => {
                      expect(router.url).toEqual('/load-page');
                    });
                });
            }));

        it('should not `Load` w/o authentication',
          inject([Router],
            (router: Router) => {
              const fixture = TestBed.createComponent(TestBootstrapComponent);
              fixture.detectChanges();

              router.navigate(['/'])
                .then(() => {
                  expect(router.url).toEqual('/');

                  router.navigate(['/load-page'])
                    .then(() => {
                      expect(router.url).toEqual('/');
                    });
                });
            }));
      });
  });
