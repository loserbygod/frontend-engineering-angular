import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppState, User } from './app.state';

const initialState: AppState = {
  loading: false,
  user: null,
  error: null
};

@Injectable({ providedIn: 'root' })
export class AppStore {

  private stateSubject = new BehaviorSubject<AppState>(initialState);
  state$ = this.stateSubject.asObservable();

  // setters 
  setLoading(loading: boolean): void {
    this.updateState({ loading });
  }

  setUser(user: User): void {
    this.updateState({ user });
  }

  setError(error: string | null): void {
    this.updateState({ error });
  }

  reset(): void {
    this.stateSubject.next(initialState);
  }

  // helper interno
  private updateState(partial: Partial<AppState>): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...partial
    });
  }
}
