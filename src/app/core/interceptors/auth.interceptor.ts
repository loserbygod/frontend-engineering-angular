import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const token = this.authService.getToken();

    const authRequest = token
      ? request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        })
      : request;

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;

          return this.authService.refreshToken().pipe(
            switchMap(newToken => {
              this.isRefreshing = false;

              return next.handle(
                request.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` }
                })
              );
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
