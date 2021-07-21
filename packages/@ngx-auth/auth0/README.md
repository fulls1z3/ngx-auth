# @ngx-auth/auth0 [![npm version](https://badge.fury.io/js/%40ngx-auth%2Fauth0.svg)](https://www.npmjs.com/package/@ngx-auth/auth0) [![npm downloads](https://img.shields.io/npm/dm/%40ngx-auth%2Fauth0.svg)](https://www.npmjs.com/package/@ngx-auth/auth0)

**[Auth0]** platform implementation of **[ngx-auth]**

[![CircleCI](https://circleci.com/gh/fulls1z3/ngx-auth.svg?style=shield)](https://circleci.com/gh/fulls1z3/ngx-auth)
[![coverage](https://codecov.io/github/fulls1z3/ngx-auth/coverage.svg?branch=master)](https://codecov.io/gh/fulls1z3/ngx-auth)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

## Table of contents:

- [Getting started](#getting-started)
  - [Installation](#installation) - [Examples](#examples) - [Related packages](#related-packages) - [Adding `@ngx-auth/auth0` to your project (SystemJS)](#adding-systemjs) - [Route configuration](#route-config)
  - [app.module configuration](#appmodule-config)
- [Settings](#settings) - [Setting up `Auth0Module` to use `Auth0StaticLoader`](#setting-up-staticloader)
- [SPA/Browser platform implementation](#browser-platform-impl)
- [Server platform implementation](#server-platform-impl)
- [Usage](#usage)
- [License](#license)

## <a name="getting-started"> Getting started

### <a name="installation"> Installation

You can install **`@ngx-auth/auth0`** using `npm`

```
npm install @ngx-auth/auth0 --save
```

### <a name="examples"></a> Examples

- [universal/universal] and [fulls1z3/example-app] are officially maintained projects, showcasing common patterns and best
  practices for **`@ngx-auth/auth0`**.

### <a name="related-packages"></a> Related packages

The following packages may be used in conjunction with **`@ngx-auth/auth0`**:

- [@ngx-auth/core]

### <a name="adding-systemjs"></a> Adding `@ngx-auth/auth0` to your project (SystemJS)

Add `map` for **`@ngx-auth/auth0`** in your `systemjs.config`

```javascript
'@ngx-auth/auth0': 'node_modules/@ngx-auth/auth0/bundles/auth0.umd.min.js'
```

### <a name="route-config"></a> Route configuration

Import `AuthGuard` using the mapping `'@ngx-auth/core'` and append `canActivate: [AuthGuard]` or `canActivateChild: [AuthGuard]`
properties to the route definitions at **app.routes** (_considering the app.routes is the route definitions in Angular application_).

#### NOTICE

> You should define a **callback url** (_here we use `auth-callback`_) handling the Auth0 callback process, and a
> **public** url as a landing component (_to prevent infinite loop on routing where no public interfaces exist_).

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
        path: 'public',
        component: PublicComponent
      },
      {
        path: 'auth-callback',
        component: AuthCallbackComponent
      }
    ]
  },
  ...
];
```

### <a name="appmodule-config"></a> app.module configuration

Import `Auth0Module` using the mapping `'@ngx-auth/auth0'` and append `Auth0Module.forRoot({...})` within the imports property
of **app.module** (_considering the app.module is the core module in Angular application_).

## <a name="settings"></a> Settings

You can call the [forRoot] static method using `Auth0StaticLoader`. By default, it is configured to have no settings.

> You can customize this behavior (_and ofc other settings_) by supplying **auth0 settings** to `Auth0StaticLoader`.

The following examples show the use of an exported function (_instead of an inline function_) for [AoT compilation].

### <a name="setting-up-staticloader"></a> Setting up `Auth0Module` to use `Auth0StaticLoader`

```TypeScript
...
import { AuthLoader, AuthModule } from '@ngx-auth/core';
import { Auth0Module, Auth0StaticLoader } from '@ngx-auth/auth0';
...

export function auth0Factory(): AuthLoader {
  return new Auth0StaticLoader({
    backend: {
      clientID: 'YOUR_AUTH0_CLIENT_ID',
      domain: 'YOUR_APP_NAME.us.auth0.com',
      redirectUri: 'http://YOUR_APP_URL/auth-callback',
      scope: 'openid',
      responseType: 'token id_token'
    },
    storage: localStorage,
    storageKey: 'currentUser',
    publicRoute: ['public'],
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
    AuthModule,
    Auth0Module.forRoot({
      provide: AuthLoader,
      useFactory: (auth0Factory)
    }),
    ...
  ],
  ...
  bootstrap: [AppComponent]
})
```

`Auth0StaticLoader` has one parameter:

- **providedSettings**: `AuthSettings` : auth settings
  - **backend**: `Backend` : auth0 backend
  - **storage**: `any` : storage (_by default, localStorage_)
  - **storageKey**: `string` : storage key (_by default, `'currentUser'`_)
  - **loginRoute**: `Array<any>` : public route, used as a landing component (_by default, `['public']`_)
  - **defaultUrl**: `string` : default URL, used as a fallback route after successful authentication (_by default, `''`_)

> :+1: Hellcat! **`@ngx-auth/auth0`** is now ready to do some magic with [Auth0] using the configuration above.

**Note**: If your **Angular** application is performing **server-side rendering** (_Angular Universal_), then you should
follow the steps explained below.

## <a name="browser-platform-impl"></a> SPA/Browser platform implementation

- Remove the implementation from **app.module** (_considering the app.module is the core module in Angular application_).
- Import `Auth0Module` using the mapping `'@ngx-auth/auth0'` and append `Auth0Module.forRoot({...})` within the imports property
  of **app.browser.module** (_considering the app.browser.module is the browser module in Angular Universal application_).

#### app.browser.module.ts

```TypeScript
...
import { AuthLoader, AuthModule } from '@ngx-auth/core';
import { Auth0Module, Auth0StaticLoader } from '@ngx-auth/auth0';
...

export function auth0Factory(): AuthLoader {
  return new Auth0StaticLoader({
    backend: {
      clientID: 'YOUR_AUTH0_CLIENT_ID',
      domain: 'YOUR_APP_NAME.us.auth0.com',
      redirectUri: 'http://YOUR_APP_URL/auth-callback',
      scope: 'openid',
      responseType: 'token id_token'
    },
    storage: localStorage,
    storageKey: 'currentUser',
    publicRoute: ['public'],
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
    AuthModule,
    Auth0Module.forRoot({
      provide: AuthLoader,
      useFactory: (auth0Factory)
    }),
    ...
  ],
  ...
  bootstrap: [AppComponent]
})
```

## <a name="server-platform-impl"></a> Server platform implementation.

- Import `Auth0Module` using the mapping `'@ngx-auth/auth0'` and append `Auth0Module.forServer()` within the imports property
  of **app.server.module** (_considering the app.server.module is the server module in Angular Universal application_).

#### app.server.module.ts

```TypeScript
...
import { AuthModule } from '@ngx-auth/core';
import { Auth0Module } from '@ngx-auth/auth0';
...

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    AuthModule.forServer(),
    Auth0Module.forServer(),
    ...
  ],
  ...
  bootstrap: [AppComponent]
})
```

## <a name="usage"></a> Usage

`Auth0Service` has the `authorize`, `authenticate` and `invalidate` methods:

The `authenticate` method invokes the `WebAuth.parseHash` method to build the **access_token**, **id_token** and **expiresAt**.
If successful, then the **tokens** are added to the `storage` (_configured at the `AuthLoader`_) and the `accessToken`,
`idToken` and `expiresAt` properties of `Auth0Service` are set.

These _tokens_ might be used by other services in the application to set the **authorization header** of http requests made
to **secure** endpoints.

As the name says, the `invalidate` method clears the _tokens_, flushes the **authentication response** from the `storage`,
and redirects to the `login` page.

## <a name="license"></a> License

The MIT License (MIT)

Copyright (c) 2021 [Burak Tasci]

[auth0]: https://auth0.com
[ngx-auth]: https://github.com/fulls1z3/ngx-auth
[universal/universal]: https://github.com/universal/universal
[fulls1z3/example-app]: https://github.com/fulls1z3/example-app
[@ngx-auth/core]: https://github.com/fulls1z3/ngx-auth/tree/master/packages/@ngx-auth/core
[@ngx-config/core]: https://github.com/fulls1z3/ngx-config/tree/master/packages/@ngx-config/core
[forroot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[aot compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[burak tasci]: https://github.com/fulls1z3
