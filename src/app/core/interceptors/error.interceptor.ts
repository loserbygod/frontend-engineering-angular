import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, switchMap, throwError, catchError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthStateService } from '../state/auth-state.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private authStateService: AuthStateService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status !== 401) {
          return throwError(() => error);
        }

        if (this.authStateService.isRefreshing()) {
          return this.authStateService.waitForToken().pipe(
            switchMap(token =>
              next.handle(
                request.clone({
                  setHeaders: { Authorization: `Bearer ${token}` }
                })
              )
            )
          );
        }

        this.authStateService.startRefresh();

        return this.authService.refreshToken().pipe(
          switchMap(newToken => {
            this.authStateService.endRefresh(newToken);

            return next.handle(
              request.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              })
            );
          })
        );
      })
    );
  }
}
