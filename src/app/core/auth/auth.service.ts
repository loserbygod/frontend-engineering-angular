import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private token$ = new BehaviorSubject<string | null>('mock-token');

  getToken(): string | null {
    return this.token$.value;
  }

  refreshToken(): Observable<string> {
    console.log('[Auth] Refreshing token...');

    return of('new-mock-token').pipe(
      delay(1000),
      tap(token => this.token$.next(token))
    );
  }

  clearSession(): void {
    this.token$.next(null);
  }
}
