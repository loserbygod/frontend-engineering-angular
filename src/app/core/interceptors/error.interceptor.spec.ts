import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AuthStateService } from '../auth/auth-state.service';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
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

  it('should report error when http error occurs', () => {
  spyOn(datadogService, 'logError');

  http.get('/fail').subscribe({
    error: () => {}
  });

  const req = httpMock.expectOne('/fail');

  req.flush(
    { message: 'error' },
    { status: 500, statusText: 'Server Error' }
  );

  expect(datadogService.logError).toHaveBeenCalled();
});
});