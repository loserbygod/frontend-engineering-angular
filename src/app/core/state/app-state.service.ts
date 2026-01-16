import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  /**
   * =========================
   * STATE (BehaviorSubjects)
   * =========================
   */

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  private erroApiSubject = new BehaviorSubject<boolean>(false);
  private carregandoSubject = new BehaviorSubject<boolean>(false);
  private tokenExpiradoSubject = new BehaviorSubject<boolean>(false);

  /**
   * =========================
   * PUBLIC STREAMS
   * =========================
   * Expostos apenas como Observable
   */

  readonly usuario$ = this.usuarioSubject.asObservable();
  readonly possuiErroApi$ = this.erroApiSubject.asObservable();
  readonly carregando$ = this.carregandoSubject.asObservable();
  readonly tokenExpirado$ = this.tokenExpiradoSubject.asObservable();

  /**
   * =========================
   * SETTERS 
   * =========================
   */

  setUsuario(usuario: Usuario | null): void {
    this.usuarioSubject.next(usuario);
  }

  setErroApi(valor: boolean): void {
    this.erroApiSubject.next(valor);
  }

  setCarregando(valor: boolean): void {
    this.carregandoSubject.next(valor);
  }

  setTokenExpirado(valor: boolean): void {
    this.tokenExpiradoSubject.next(valor);
  }

  /**
   * =========================
   * GETTERS SINCRONOS 
   * =========================
   */

  get usuarioAtual(): Usuario | null {
    return this.usuarioSubject.getValue();
  }

  get possuiErroApiAtual(): boolean {
    return this.erroApiSubject.getValue();
  }

  get carregandoAtual(): boolean {
    return this.carregandoSubject.getValue();
  }

  get tokenExpiradoAtual(): boolean {
    return this.tokenExpiradoSubject.getValue();
  }

  resetState(): void {
    this.usuarioSubject.next(null);
    this.erroApiSubject.next(false);
    this.carregandoSubject.next(false);
    this.tokenExpiradoSubject.next(false);
  }
}
