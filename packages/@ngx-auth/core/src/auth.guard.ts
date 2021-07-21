import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthLoader } from './auth.loader';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private readonly loader: AuthLoader,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const url = state.url;

    return this.handleAuth(url);
  }

  async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(route, state);
  }

  async canLoad(route: Route): Promise<boolean> {
    const url = `/${route.path}`;

    return this.handleAuth(url);
  }

  private async handleAuth(url: string): Promise<boolean> {
    if (this.auth.isAuthenticated) {
      return Promise.resolve(true);
    }

    this.auth.redirectUrl = url;

    return this.router.navigate(this.loader.loginRoute).then(() => false);
  }
}
