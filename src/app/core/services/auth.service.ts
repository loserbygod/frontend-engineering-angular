import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string {
    // Simulação de token JWT
    return 'fake-jwt-token-123456';
  }
}
