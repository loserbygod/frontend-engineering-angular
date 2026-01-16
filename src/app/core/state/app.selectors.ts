import { map } from 'rxjs/operators';
import { AppStore } from './app.store';

export class AppSelectors {

  static loading(store: AppStore) {
    return store.state$.pipe(map(state => state.loading));
  }

  static user(store: AppStore) {
    return store.state$.pipe(map(state => state.user));
  }

  static error(store: AppStore) {
    return store.state$.pipe(map(state => state.error));
  }
}
