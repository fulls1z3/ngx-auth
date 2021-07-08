# @ngx-auth/core [![npm version](https://badge.fury.io/js/%40ngx-auth%2Fcore.svg)](https://www.npmjs.com/package/@ngx-auth/core) [![npm downloads](https://img.shields.io/npm/dm/%40ngx-auth%2Fcore.svg)](https://www.npmjs.com/package/@ngx-auth/core)

JWT authentication utility for **Angular** & **Angular Universal**

[![CircleCI](https://circleci.com/gh/fulls1z3/ngx-auth.svg?style=shield)](https://circleci.com/gh/fulls1z3/ngx-auth)
[![coverage](https://codecov.io/github/fulls1z3/ngx-auth/coverage.svg?branch=master)](https://codecov.io/gh/fulls1z3/ngx-auth)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

**`@ngx-auth/core`** is a basic JWT-based authentication utility used for logging in and out of the **Angular** application
and restrict unauthenticated access from accessing restricted routes.

## Table of contents:

- [Getting started](#getting-started)
  - [Installation](#installation) - [Examples](#examples) - [Recommended packages](#recommended-packages) - [Adding `@ngx-auth/core` to your project (SystemJS)](#adding-systemjs) - [Route configuration](#route-config)
  - [app.module configuration](#appmodule-config)
- [Settings](#settings) - [Setting up `AuthModule` to use `AuthStaticLoader`](#setting-up-staticloader)
- [SPA/Browser platform implementation](#browser-platform-impl)
- [Server platform implementation](#server-platform-impl)
- [Usage](#usage)
- [License](#license)

## <a name="getting-started"> Getting started

### <a name="installation"> Installation

You can install **`@ngx-auth/core`** using `npm`

```
npm install @ngx-auth/core --save
```

### <a name="examples"></a> Examples

- [universal/universal] and [fulls1z3/example-app] are officially maintained projects, showcasing common patterns and best
  practices for **`@ngx-auth/core`**.

### <a name="recommended-packages"></a> Recommended packages

The following package(s) have no dependency for **`@ngx-auth/core`**, however may provide supplementary/shorthand functionality:

- [@ngx-config/core]: provides auth settings from the application settings loaded during application initialization

### <a name="adding-systemjs"></a> Adding `@ngx-auth/core` to your project (SystemJS)

Add `map` for **`@ngx-auth/core`** in your `systemjs.config`

```javascript
'@ngx-auth/core': 'node_modules/@ngx-auth/core/bundles/core.umd.min.js'
```

### <a name="route-config"></a> Route configuration

Import `AuthGuard` using the mapping `'@ngx-auth/core'` and append `canActivate: [AuthGuard]` or `canActivateChild: [AuthGuard]`
properties to the route definitions at **app.routes** (_considering the app.routes is the route definitions in Angular application_).

#### app.routes.ts

```TypeScript
...
import { AuthGuard } from '@ngx-auth/core';
...
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'account',
        children: [
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent
          }
        ],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'purchases',
        component: PurchasesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  ...
];
```

### <a name="appmodule-config"></a> app.module configuration

Import `AuthModule` using the mapping `'@ngx-auth/core'` and append `AuthModule.forRoot({...})` within the imports property
of **app.module** (_considering the app.module is the core module in Angular application_).

## <a name="settings"></a> Settings

You can call the [forRoot] static method using `AuthStaticLoader`. By default, it is configured to have no settings.

> You can customize this behavior (_and ofc other settings_) by supplying **auth settings** to `AuthStaticLoader`.

The following examples show the use of an exported function (_instead of an inline function_) for [AoT compilation].

### <a name="setting-up-staticloader"></a> Setting up `AuthModule` to use `AuthStaticLoader`

```TypeScript
...
import { AuthModule, AuthLoader, AuthStaticLoader } from '@ngx-auth/core';
...

export function authFactory(): AuthLoader {
  return new AuthStaticLoader({
    backend: {
      endpoint: '/api/authenticate',
      params: []
    },
    storage: localStorage,
    storageKey: 'currentUser',
    loginRoute: ['login'],
    defaultUrl: ''
  });
}

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    AuthModule.forRoot({
      provide: AuthLoader,
      useFactory: (authFactory)
    }),
    ...
  ],
  ...
  bootstrap: [AppComponent]
})
```

`AuthStaticLoader` has one parameter:

- **providedSettings**: `AuthSettings` : auth settings
  - **backend**: `Backend` : auth backend (_by default, using the endpoint `'/api/authenticate'`_)
  - **storage**: `any` : storage (_by default, localStorage_)
  - **storageKey**: `string` : storage key (_by default, `'currentUser'`_)
  - **loginRoute**: `Array<any>` : login route, used to redirect guarded routes (_by default, `['login']`_)
  - **defaultUrl**: `string` : default URL, used as a fallback route after successful authentication (_by default, `''`_)

> :+1: On it! **`@ngx-auth/core`** is now ready to perform JWT-based authentication regarding the configuration above.

**Note**: If your **Angular** application is performing **server-side rendering** (_Angular Universal_), then you should
follow the steps explained below.

## <a name="browser-platform-impl"></a> SPA/Browser platform implementation

- Remove the implementation from **app.module** (_considering the app.module is the core module in Angular application_).
- Import `AuthModule` using the mapping `'@ngx-auth/core'` and append `AuthModule.forRoot({...})` within the imports property
  of **app.browser.module** (_considering the app.browser.module is the browser module in Angular Universal application_).

#### app.browser.module.ts

```TypeScript
...
import { AuthModule, AuthLoader, AuthStaticLoader } from '@ngx-auth/core';
...

export function authFactory(): AuthLoader {
  return new AuthStaticLoader({
    backend: {
      endpoint: '/api/authenticate',
      params: []
    },
    storage: localStorage,
    storageKey: 'currentUser',
    loginRoute: ['login'],
    defaultUrl: ''
  });
}

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    AuthModule.forRoot({
      provide: AuthLoader,
      useFactory: (authFactory)
    }),
    ...
  ],
  ...
  bootstrap: [AppComponent]
})
```

## <a name="server-platform-impl"></a> Server platform implementation.

- Import `AuthModule` using the mapping `'@ngx-auth/core'` and append `AuthModule.forServer()` within the imports property
  of **app.server.module** (_considering the app.server.module is the server module in Angular Universal application_).

#### app.server.module.ts

```TypeScript
...
import { AuthModule } from '@ngx-auth/core';
...

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    AuthModule.forServer(),
    ...
  ],
  ...
  bootstrap: [AppComponent]
})
```

## <a name="usage"></a> Usage

`AuthService` has the `authenticate` and `invalidate` methods:

The `authenticate` method posts the **credentials** to the **API** (_configured at the `AuthLoader`_) using the parameters `username`
and `password`, and checks the response for a **JWT token**. If successful, then the **authentication response** is added
to the `storage` (_configured at the `AuthLoader`_) and the `token` property of `AuthService` is set.

That `token` might be used by other services in the application to set the **authorization header** of http requests made to **secure** endpoints.

As the name says, the `invalidate` method clears the **JWT token**, flushes the **authentication response** from the `storage`,
and redirects to the `login` page.

The following example shows how to log in and out of the **Angular** application.

#### login.component.ts

```TypeScript
...
import { AuthService } from '@ngx-auth/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  ...

  username: string;
  password: string;

  constructor(private readonly auth: AuthService) {
    ...
  }

  login(): void {
      this.auth.authenticate(this.username, this.password)
        .subscribe(() => {
          if (!this.auth.isAuthenticated)
            // display warning
        });
  }

  logout(): void {
    this.auth.invalidate();
  }
}
```

## <a name="license"></a> License

The MIT License (MIT)

Copyright (c) 2021 [Burak Tasci]

[universal/universal]: https://github.com/universal/universal
[fulls1z3/example-app]: https://github.com/fulls1z3/example-app
[@ngx-config/core]: https://github.com/fulls1z3/ngx-config/tree/master/packages/@ngx-config/core
[forroot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[aot compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[burak tasci]: https://github.com/fulls1z3
