import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthLoader, AuthService, AuthStaticLoader } from '../src';

import { mockAuthData, TestBootstrapComponent, testModuleConfig } from './common';

describe('@ngx-auth/core:', () => {
  beforeEach(() => {
    const authFactory = () => new AuthStaticLoader();

    testModuleConfig({
      provide: AuthLoader,
      useFactory: authFactory
    });
  });

  describe('AuthGuard', () => {
    beforeEach(inject([AuthService], async (auth: AuthService) => auth.invalidate()));

    it('should be able to `Activate` w/authentication', inject(
      [Router, AuthLoader],
      async (router: Router, loader: AuthLoader) => {
        const fixture = TestBed.createComponent(TestBootstrapComponent);
        fixture.detectChanges();

        loader.storage.setItem(loader.storageKey, mockAuthData);

        return router.navigate(['/']).then(async () => {
          expect(router.url).toEqual('/');

          return router.navigate(['/activate-page']).then(async () => {
            expect(router.url).toEqual('/activate-page');

            return router.navigate(['/activate-feature']).then(() => {
              expect(router.url).toEqual('/activate-feature');
            });
          });
        });
      }
    ));

    it('should not `Activate` w/o authentication', inject([Router], async (router: Router) => {
      const fixture = TestBed.createComponent(TestBootstrapComponent);
      fixture.detectChanges();

      return router.navigate(['/']).then(async () => {
        expect(router.url).toEqual('/');

        return router.navigate(['/activate-page']).then(async () => {
          expect(router.url).toEqual('/login');

          return router.navigate(['/activate-feature']).then(() => {
            expect(router.url).toEqual('/login');
          });
        });
      });
    }));

    it('should be able to `Load` w/authentication', inject(
      [Router, AuthLoader],
      async (router: Router, loader: AuthLoader) => {
        const fixture = TestBed.createComponent(TestBootstrapComponent);
        fixture.detectChanges();

        loader.storage.setItem(loader.storageKey, mockAuthData);

        return router.navigate(['/']).then(async () => {
          expect(router.url).toEqual('/');

          return router.navigate(['/load-page']).then(() => {
            expect(router.url).toEqual('/load-page');
          });
        });
      }
    ));

    it('should not `Load` w/o authentication', inject([Router], async (router: Router) => {
      const fixture = TestBed.createComponent(TestBootstrapComponent);
      fixture.detectChanges();

      return router.navigate(['/']).then(async () => {
        expect(router.url).toEqual('/');

        return router.navigate(['/load-page']).then(() => {
          expect(router.url).toEqual('/login');
        });
      });
    }));
  });
});
