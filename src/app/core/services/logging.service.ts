import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  info(message: string, data?: unknown) {
    console.log('[INFO]', message, data);
  }

   warn(message: string, error?: unknown) {
    console.warn('[WARN]', message, error);
  }

  error(message: string, error?: unknown) {
    console.error('[ERROR]', message, error);
  }
}
