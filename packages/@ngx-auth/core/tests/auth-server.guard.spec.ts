// angular
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

// module
import { TestBootstrapComponent, testServerModuleConfig } from './common';

describe('@ngx-auth/core:',
  () => {
    beforeEach(testServerModuleConfig);

    describe('AuthServerGuard',
      () => {
        it('should not `Activate`',
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

        it('should not `Load`',
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
