import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSelectors } from './core/state/app.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  providers: [AppSelectors],
  template: `
    <div *ngIf="selectors.deveExibirErroGlobal$ | async">
      <p>Erro ao carregar a aplicação.</p>
    </div>

    <div *ngIf="selectors.sessaoExpirada$ | async">
      <p>Sessão expirada. Faça login novamente.</p>
    </div>

    <div *ngIf="selectors.podeExibirConteudo$ | async">
      <p>Conteúdo principal da aplicação</p>
    </div>
  `
})
export class AppComponent {
  constructor(public selectors: AppSelectors) {}
}
