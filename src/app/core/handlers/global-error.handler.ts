import { ErrorHandler, Injectable } from '@angular/core';
import { ObservabilityService } from '../observability/observability.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private observability: ObservabilityService
  ) {}

  handleError(error: unknown): void {

    this.observability.logError(error, {
      source: 'GlobalErrorHandler'
    });

    // mantém o erro no console para debug local
    console.error(error);
  }
}
