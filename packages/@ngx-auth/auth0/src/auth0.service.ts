// angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// libs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { fromPromise as observableFromPromise } from 'rxjs/observable/fromPromise';
import * as auth0js from 'auth0-js';
import { AuthLoader } from '@ngx-auth/core';

@Injectable()
export class Auth0Service {
  private auth0: any;
  private _accessToken: string;
  private _idToken: string;
  private _expiresAt: string;
  private _isAuthenticated$: BehaviorSubject<boolean>;

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  get expiresAt(): string {
    return this._expiresAt;
  }

  get defaultUrl(): string {
    return this.loader.defaultUrl;
  }

  get isAuthenticated(): boolean {
    const expiresAt = JSON.parse(this.loader.storage.getItem(this.loader.storageKey) || '{}').expiresAt;

    return new Date().getTime() < expiresAt;
  }

  get isAuthenticated$(): BehaviorSubject<boolean> {
    return this._isAuthenticated$;
  }

  constructor(readonly loader: AuthLoader,
              protected readonly router: Router) {
    this.auth0 = new auth0js.WebAuth(this.loader.backend);

    const current = JSON.parse(this.loader.storage.getItem(this.loader.storageKey) || '{}');

    this._accessToken = current && current.accessToken;
    this._idToken = current && current.idToken;
    this._expiresAt = current && current.expiresAt;

    this._isAuthenticated$ = new BehaviorSubject<boolean>(!!this._accessToken && !!this._idToken && !!this._expiresAt);
  }

  authorize(): void {
    this.auth0.authorize();
  }

  authenticate(): Observable<boolean> {
    const res$ = new Promise<boolean>(resolve => {
      this.auth0.parseHash((err: any, res: any) => {
        if (res && res.accessToken && res.idToken) {
          this._accessToken = res.accessToken;
          this._idToken = res.idToken;
          this._expiresAt = JSON.stringify((res.expiresIn * 1000) + new Date().getTime());

          this.loader.storage.setItem(this.loader.storageKey,
            JSON.stringify({
              accessToken: this._accessToken,
              idToken: this._idToken,
              expiresAt: this._expiresAt
            }));

          this.isAuthenticated$.next(true);

          this.router.navigateByUrl(this.defaultUrl);

          return resolve(true);
        }

        return resolve(false);
      });
    });

    return observableFromPromise<boolean>(res$);
  }

  invalidate(): void {
    this._accessToken = undefined;
    this._idToken = undefined;
    this._expiresAt = undefined;

    this.loader.storage.removeItem(this.loader.storageKey);

    this.isAuthenticated$.next(false);

    this.router.navigateByUrl(this.defaultUrl);
  }
}
