import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  constructor(
    readonly loader: AuthLoader,
    protected readonly router: Router,
    @Inject(HttpClient) protected readonly http: HttpClient
  ) {
    const stored = this.loader.storage.getItem(this.loader.storageKey);
    const authContent = stored ? stored : '{}';
    const currentUser = JSON.parse(authContent);
    this._token = currentUser && currentUser.token;
  }

  authenticate(username: string, password: string): Observable<boolean> {
    const params = this.getHttpParams(this.loader.backend.params);

    return this.http
      .post<any>(
        this.loader.backend.endpoint,
        JSON.stringify({
          username,
          password
        }),
        { params }
      )
      .pipe(
        switchMap(async res => {
          const token = res && res.token;

          if (token) {
            this._token = token;

            this.loader.storage.setItem(
              this.loader.storageKey,
              JSON.stringify({
                username,
                token
              })
            );

            return this.router.navigateByUrl(this._redirectUrl || this.loader.defaultUrl).then(() => true);
          }

          return Promise.resolve(false);
        })
      );
  }

  async invalidate(): Promise<boolean> {
    this._token = undefined;
    this.loader.storage.removeItem(this.loader.storageKey);

    return this.router.navigate(this.loader.loginRoute);
  }

  protected getHttpParams = (query?: Array<any>): HttpParams => {
    let res = new HttpParams();

    if (query) {
      for (const item of query) {
        res = res.append(item.key, item.value);
      }
    }

    return res;
  };
}
