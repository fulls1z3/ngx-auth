import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { TestBootstrapComponent, testServerModuleConfig } from './common';

describe('@ngx-auth/core:', () => {
  beforeEach(testServerModuleConfig);

  describe('AuthServerGuard', () => {
    it('should not `Activate`', inject([Router], async (router: Router) => {
      const fixture = TestBed.createComponent(TestBootstrapComponent);
      fixture.detectChanges();

      return router.navigate(['/']).then(async () => {
        expect(router.url).toEqual('/');

        return router.navigate(['/activate-page']).then(async () => {
          expect(router.url).toEqual('/');

          return router.navigate(['/activate-feature']).then(() => {
            expect(router.url).toEqual('/');
          });
        });
      });
    }));

    it('should not `Load`', inject([Router], async (router: Router) => {
      const fixture = TestBed.createComponent(TestBootstrapComponent);
      fixture.detectChanges();

      return router.navigate(['/']).then(async () => {
        expect(router.url).toEqual('/');

        return router.navigate(['/load-page']).then(() => {
          expect(router.url).toEqual('/');
        });
      });
    }));
  });
});
