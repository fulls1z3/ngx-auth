// angular
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

// libs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// module
import { AuthLoader } from './auth.loader';

@Injectable()
export class AuthService {
  protected _token: string;
  private _redirectUrl: string;

  get token(): string {
    return this._token;
  }

  get redirectUrl(): string {
    return this._redirectUrl;
  }

  set redirectUrl(value: string) {
    this._redirectUrl = value;
  }

  get defaultUrl(): string {
    return this.loader.defaultUrl;
  }

  get isAuthenticated(): boolean {
    return !!this.loader.storage.getItem(this.loader.storageKey);
  }

  constructor(private readonly loader: AuthLoader,
              private readonly router: Router,
              private readonly http: Http) {
    const currentUser = JSON.parse(this.loader.storage.getItem(this.loader.storageKey) || '{}');
    this._token = currentUser && currentUser.token;
  }

  authenticate(username: string, password: string): Observable<boolean> {
    const params = this.getUrlSearchParams(this.loader.backend.params);

    return this.http.post(this.loader.backend.endpoint,
      JSON.stringify({
        username,
        password
      }),
      {search: params})
      .map((response: Response) => {
        const token = response.json() && response.json().token;

        if (token) {
          this._token = token;

          this.loader.storage.setItem(this.loader.storageKey,
            JSON.stringify({
              username,
              token
            }));

          this.router.navigateByUrl(this._redirectUrl || this.loader.defaultUrl);

          return true;
        }

        return false;
      });
  }

  invalidate(): void {
    this._token = undefined;
    this.loader.storage.removeItem(this.loader.storageKey);
    this.router.navigate(this.loader.loginRoute);
  }

  private getUrlSearchParams = (params: Array<any>): URLSearchParams => {
    const res = new URLSearchParams();

    for (const item of params)
      res.append(item.key, item.value);

    return res;
  };
}
