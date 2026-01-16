import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ObservabilityService } from '../observability/observability.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private observability: ObservabilityService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        this.observability.logError(error, {
          url: request.url,
          method: request.method,
          status: error.status
        });

        return throwError(() => error);
      })
    );
  }
}
