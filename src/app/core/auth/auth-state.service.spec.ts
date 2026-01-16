import { TestBed } from '@angular/core/testing';
import { AuthStateService } from './auth-state.service';
import { firstValueFrom } from 'rxjs';

describe('AuthStateService', () => {
  let service: AuthStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with refreshing = false', async () => {
  const value = await firstValueFrom(service.isRefreshing$);
  expect(value).toBeFalsy();
});

it('should set refreshing to true', async () => {
  service.startRefresh();

  const value = await firstValueFrom(service.isRefreshing$);
  expect(value).toBe(true);
});

it('should emit new token and stop refreshing', async () => {
  const token = 'new-token';

  service.startRefresh();
  service.endRefresh(token);

  const emittedToken = await firstValueFrom(service.token$);
  const refreshing = await firstValueFrom(service.isRefreshing$);

  expect(emittedToken).toBe(token);
  expect(refreshing).toBeFalsy();
});

});
