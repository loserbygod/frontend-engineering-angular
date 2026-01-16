import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../auth/auth.service';
import { AuthStateService } from '../auth/auth-state.service';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        AuthService,
        AuthStateService
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header when token exists', () => {
  spyOn(authService, 'getToken').and.returnValue('mock-token');

  http.get('/test').subscribe();

  const req = httpMock.expectOne('/test');

  expect(req.request.headers.get('Authorization'))
    .toBe('Bearer mock-token');

  req.flush({});
});

it('should not add Authorization header when token does not exist', () => {
  spyOn(authService, 'getToken').and.returnValue(null);

  http.get('/test').subscribe();

  const req = httpMock.expectOne('/test');

  expect(req.request.headers.has('Authorization')).toBeFalsy();

  req.flush({});
});

it('should refresh token on 401 error', async () => {
  spyOn(authService, 'getToken').and.returnValue('expired-token');
  spyOn(authService, 'refreshToken').and.returnValue(
    of('new-token')
  );

  http.get('/secure').subscribe();

  const firstReq = httpMock.expectOne('/secure');
  firstReq.flush({}, { status: 401, statusText: 'Unauthorized' });

  const retryReq = httpMock.expectOne('/secure');

  expect(retryReq.request.headers.get('Authorization'))
    .toBe('Bearer new-token');

  retryReq.flush({});
});

  });