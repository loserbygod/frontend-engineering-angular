import { Injectable } from '@angular/core';

export type LogLevel = 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root'
})
export class ObservabilityService {

  log(level: LogLevel, message: string, context?: unknown): void {
    // Simulação de envio para Datadog
    console.group(`[Datadog - ${level.toUpperCase()}]`);
    console.log('Message:', message);
    if (context) {
      console.log('Context:', context);
    }
    console.groupEnd();
  }

  logError(error: unknown, context?: unknown): void {
    this.log('error', 'Unhandled error captured', {
      error,
      context,
      timestamp: new Date().toISOString()
    });
  }
}
