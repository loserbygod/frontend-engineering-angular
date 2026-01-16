import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';

export const appConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
