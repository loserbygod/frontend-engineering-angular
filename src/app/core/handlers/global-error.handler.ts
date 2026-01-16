import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private logger: LoggingService) {}

  handleError(error: unknown): void {
    this.logger.error('Unhandled error', error);
  }
}
