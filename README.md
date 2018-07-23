# ngx-auth
**[Auth0]** platform implementation and JWT authentication utility for **Angular** & **Angular Universal**

[![CircleCI](https://circleci.com/gh/holidaylab/ngx-auth.svg?style=shield)](https://circleci.com/gh/holidaylab/ngx-auth)
[![coverage](https://codecov.io/github/holidaylab/ngx-auth/coverage.svg?branch=master)](https://codecov.io/gh/holidaylab/ngx-auth)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Greenkeeper badge](https://badges.greenkeeper.io/holidaylab/ngx-auth.svg)](https://greenkeeper.io/)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

**`@ngx-auth/core`** is a basic JWT-based authentication utility used for logging in and out of the **Angular** application
and restrict unauthenticated access from accessing restricted routes.

As of version **`5.1.0`**, the library contains **[Auth0]** implementation.

#### NOTICE
> This *[6.x.x] branch* is intented to work with `Angular v6.x.x`. If you're developing on a later release of **Angular**
than `v6.x.x`, then you should probably choose the appropriate version of this library by visiting the *[master] branch*.

## Packages:
Name | Description | NPM
--- | --- | ---
[@ngx-auth/core](https://github.com/holidaylab/ngx-auth/tree/master/packages/@ngx-auth/core) | Authentication utility for **Angular** | [![npm version](https://badge.fury.io/js/%40ngx-auth%2Fcore.svg)](https://www.npmjs.com/package/@ngx-auth/core)
[@ngx-auth/auth0](https://github.com/holidaylab/ngx-auth/tree/master/packages/@ngx-auth/auth0) | **[Auth0]** platform implementation of **[ngx-auth]** | [![npm version](https://badge.fury.io/js/%40ngx-auth%2Fauth0.svg)](https://www.npmjs.com/package/@ngx-auth/auth0)

## Examples
- [ng-seed/universal] and [fulls1z3/example-app] are officially maintained projects, showcasing common patterns and best
practices for **`ngx-auth`**.

## Contributing
If you want to file a bug, contribute some code, or improve documentation, please read up on the following contribution guidelines:
- [Issue guidelines](CONTRIBUTING.md#submit)
- [Contributing guidelines](CONTRIBUTING.md)
- [Coding rules](CONTRIBUTING.md#rules)
- [Change log](CHANGELOG.md)

#### Thanks to
- [JetBrains], for their support to this open source project with free [WebStorm] licenses.

## License
The MIT License (MIT)

Copyright (c) 2018 [HolidayLAB]

[master]: https://github.com/holidaylab/ngx-auth/core/tree/master
[6.x.x]: https://github.com/holidaylab/ngx-auth/core/tree/6.x.x
[ngx-auth]: https://github.com/holidaylab/ngx-auth
[ng-seed/universal]: https://github.com/ng-seed/universal
[fulls1z3/example-app]: https://github.com/fulls1z3/example-app
[Auth0]: https://auth0.com
[JetBrains]: https://www.jetbrains.com/community/opensource
[WebStorm]:   https://www.jetbrains.com/webstorm
[HolidayLAB]: https://github.com/holidaylab
