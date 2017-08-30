// angular
import { getTestBed } from '@angular/core/testing';

// module
import { AuthLoader, AuthService, AuthStaticLoader, Backend } from '../index';
import { testModuleConfig, testSettings } from './index.spec';

describe('@ngx-auth/core:',
  () => {
    beforeEach(() => {
      const authFactory = () => new AuthStaticLoader();

      testModuleConfig({
        provide: AuthLoader,
        useFactory: (authFactory)
      });
    });

    describe('AuthLoader',
      () => {
        it('should be able to return the default authSettings',
          () => {
            const loader = new AuthStaticLoader();

            expect(loader.backend.endpoint).toEqual(testSettings.backend.endpoint);
            expect(loader.backend.params).toEqual([]);
            expect(loader.storage).toEqual(testSettings.storage);
            expect(loader.storageKey).toEqual(testSettings.storageKey);
            expect(loader.loginRoute).toEqual(testSettings.loginRoute);
            expect(loader.defaultUrl).toEqual(testSettings.defaultUrl);
          });

        it('should be able to return custom authSettings',
          () => {
            const loader = new AuthStaticLoader(testSettings);

            expect(loader.backend).toEqual(testSettings.backend);
            expect(loader.storage).toEqual(testSettings.storage);
            expect(loader.storageKey).toEqual(testSettings.storageKey);
            expect(loader.loginRoute).toEqual(testSettings.loginRoute);
            expect(loader.defaultUrl).toEqual(testSettings.defaultUrl);
          });

        it('should be able to provide `AuthStaticLoader`',
          () => {
            const injector = getTestBed();
            const auth = injector.get(AuthService);

            expect(AuthStaticLoader).toBeDefined();
            expect(auth.loader).toBeDefined();
            expect(auth.loader instanceof AuthStaticLoader).toBeTruthy();
          });

        it('should be able to provide any `AuthLoader`',
          () => {
            class CustomLoader implements AuthLoader {
              get backend(): Backend {
                return testSettings.backend;
              }

              get storage(): any {
                return testSettings.storage;
              }

              get storageKey(): string {
                return testSettings.storageKey;
              }

              get loginRoute(): Array<any> {
                return testSettings.loginRoute;
              }

              get defaultUrl(): string {
                return testSettings.defaultUrl;
              }
            }

            testModuleConfig({
              provide: AuthLoader,
              useClass: CustomLoader
            });

            const injector = getTestBed();
            const auth = injector.get(AuthService);

            expect(CustomLoader).toBeDefined();
            expect(auth.loader).toBeDefined();
            expect(auth.loader instanceof CustomLoader).toBeTruthy();
          });
      });
  });
