import { AppStore } from './app.store';
import { AppState } from './app.state';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { executeSchedule } from 'rxjs/internal/util/executeSchedule';

describe('AppStore', () => {
  let store: AppStore;

  beforeEach(() => {
    store = new AppStore();
  });

  it('should initialize with default state', async () => {
    const state = await firstValueFrom(store.state$);
    expect(state).toEqual({
      loading: false,
      user: null,
      error: null
    });
  });

 it('should set loading state', async () => {
  store.setLoading(true);

  const state = await firstValueFrom(store.state$);
  expect(state.loading).toBe(true);
});

 it('should set user state', async () => {
  const user = { id: '1', name: 'Dani' };
  store.setUser(user);

  const state = await firstValueFrom(store.state$);
  expect(state.user).toEqual(user);
});

  it('should reset state to initial values', async () => {
    store.setLoading(true);
    store.setError('Erro');

    store.reset();

    const state = await firstValueFrom(store.state$);
    expect(state).toEqual({
      loading: false,
      user: null,   
      error: null
    });
  });
});
