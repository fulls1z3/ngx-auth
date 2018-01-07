// angular
import { Component, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// module
import { AuthTestingModule } from '../testing/auth.testing.module';
import { AuthGuard, AuthModule, AuthSettings } from '../index';

@Component({template: '<router-outlet></router-outlet>'})
// tslint:disable-next-line
export class TestBootstrapComponent {
}

@Component({template: ''})
// tslint:disable-next-line
export class TestComponent {
}

@NgModule({
  imports: [RouterTestingModule],
  declarations: [
    TestBootstrapComponent,
    TestComponent
  ]
})
// tslint:disable-next-line
class TestSharedModule {
}

const testLazyRoutes: Routes = [
  {
    path: '',
    component: TestComponent
  }
];

@NgModule({
  imports: [
    RouterTestingModule.withRoutes(testLazyRoutes),
    TestSharedModule
  ]
})
// tslint:disable-next-line
class TestLazyModule {
}

const testRoutes: Routes = [
  {
    path: '',
    component: TestBootstrapComponent,
    children: [
      {
        path: '',
        component: TestComponent
      },
      {
        path: 'activate-page',
        component: TestComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'load-page',
        loadChildren: () => TestLazyModule,
        canLoad: [AuthGuard]
      },
      {
        path: 'activate-feature',
        children: [
          {
            path: '',
            component: TestComponent,
            canActivate: [AuthGuard]
          }
        ],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'login',
        component: TestComponent
      }
    ]
  }
];

export const testSettings: AuthSettings = {
  backend: {
    endpoint: '/api/authenticate',
    params: [{
      key: 'test',
      value: 'test'
    }]
  },
  storage: localStorage,
  storageKey: 'currentUser',
  loginRoute: ['login'],
  defaultUrl: ''
};

export const mockAuthData = JSON.stringify({
    username: 'username',
    token: 'token'
  }
);

export const testModuleConfig = (moduleOptions?: any) => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(testRoutes),
        AuthModule.forRoot(moduleOptions),
        AuthTestingModule.withParams(moduleOptions, '/api/authenticate'),
        TestSharedModule
      ]
    });
};

export const testServerModuleConfig = () => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(testRoutes),
        AuthModule.forServer(),
        TestSharedModule
      ]
    });
};
