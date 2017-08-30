// angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';

// module
import { AuthLoader } from './auth.loader';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly loader: AuthLoader,
              private readonly auth: AuthService,
              private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;

    return this.handleAuth(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    return this.handleAuth(url);
  }

  private handleAuth(url: string): boolean {
    if (this.auth.isAuthenticated)
      return true;

    this.auth.redirectUrl = url;
    this.router.navigate(this.loader.loginRoute);

    return false;
  }
}
