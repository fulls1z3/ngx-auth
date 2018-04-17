// angular
import { Injectable } from '@angular/core';

// libs
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

@Injectable()
export class Auth0ServerService {
  get accessToken(): string {
    return undefined;
  }

  get idToken(): string {
    return undefined;
  }

  get expiresAt(): string {
    return undefined;
  }

  get defaultUrl(): string {
    return undefined;
  }

  get isAuthenticated(): boolean {
    return false;
  }

  get isAuthenticated$(): BehaviorSubject<boolean> {
    return new BehaviorSubject<boolean>(false);
  }

  authorize(): void {
    return;
  }

  authenticate(): Observable<boolean> {
    return observableOf(false);
  }

  invalidate(): void {
    return;
  }
}
