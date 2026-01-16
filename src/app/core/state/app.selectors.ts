import { inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AppStateService } from './app-state.service';

/**
 * Selectors centralizados
 * Responsáveis por derivar estado a partir do AppState
 */
export class AppSelectors {
  private state = inject(AppStateService);

  /**
   * Exemplo clássico:
   * Tela pode ser exibida?
   */
  readonly podeExibirConteudo$ = combineLatest([
    this.state.carregando$,
    this.state.possuiErroApi$
  ]).pipe(
    map(([carregando, erro]) => !carregando && !erro)
  );

  /**
   * Exibir fallback de erro global?
   */
  readonly deveExibirErroGlobal$ = combineLatest([
    this.state.possuiErroApi$,
    this.state.carregando$
  ]).pipe(
    map(([erro, carregando]) => erro && !carregando)
  );

  /**
   * Sessão inválida (token expirado)
   */
  readonly sessaoExpirada$ = combineLatest([
    this.state.tokenExpirado$,
    this.state.usuario$
  ]).pipe(
    map(([tokenExpirado, usuario]) => tokenExpirado && !!usuario)
  );
}
