import { AppStore } from './app.store';
import { AppSelectors } from './app.selectors';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

describe('AppSelectors', () => {
  let store: AppStore;

  beforeEach(() => {
    store = new AppStore();
  });

  it('should select loading state', async () => {
  store.setLoading(true);

  const loading = await firstValueFrom(
    AppSelectors.loading(store)
  );

  expect(loading).toBe(true);
});

  it('should select user state', async () => {
    const user = { id: '2', name: 'Astra' };
    store.setUser(user);

    const result = await firstValueFrom(AppSelectors.user(store));
    expect(result).toEqual(user);
  });

  it('should select error state', async () => {
    store.setError('Erro crítico');

    const error = await firstValueFrom(AppSelectors.error(store));
    expect(error).toBe('Erro crítico');
  });
});
