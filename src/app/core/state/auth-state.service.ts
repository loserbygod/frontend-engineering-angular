import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private refreshingSubject = new BehaviorSubject<boolean>(false);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  isRefreshing$ = this.refreshingSubject.asObservable();
  token$ = this.tokenSubject.asObservable();

  isRefreshing(): boolean {
    return this.refreshingSubject.getValue();
  }

  startRefresh(): void {
    this.refreshingSubject.next(true);
  }

  endRefresh(newToken: string): void {
    this.tokenSubject.next(newToken);
    this.refreshingSubject.next(false);
  }

  waitForToken(): Observable<string> {
    return this.token$.pipe(
      filter((token): token is string => token !== null),
      take(1)
    );
  }
}
