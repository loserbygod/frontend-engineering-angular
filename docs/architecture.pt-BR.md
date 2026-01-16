# Arquitetura do Projeto

Este documento descreve as decisões arquiteturais adotadas neste repositório, com foco em **escalabilidade**, **manutenibilidade**, **qualidade** e **clareza de responsabilidades** no frontend.

A arquitetura apresentada reflete padrões e práticas utilizados em projetos corporativos reais, especialmente em contextos de alta complexidade e criticidade.

---

## 🎯 Objetivos Arquiteturais

A arquitetura foi desenhada para atender aos seguintes objetivos:

- Facilitar a evolução do código ao longo do tempo
- Reduzir acoplamento entre funcionalidades
- Melhorar a testabilidade
- Tornar o projeto compreensível para novos desenvolvedores
- Permitir atuação paralela de diferentes frentes (features, correções, melhorias técnicas)
- Garantir previsibilidade do comportamento da UI

---

## 🧱 Visão Geral da Estrutura

A aplicação segue uma abordagem **feature-oriented**, combinada com camadas bem definidas para responsabilidades transversais.

Estrutura geral:

```
src/
├── app/
│ ├── core/
│ ├── shared/
│ ├── features/
│ ├── state/
│ ├── services/
│ ├── guards/
│ └── app.module.ts
└── assets/
```


Cada pasta possui uma responsabilidade clara, evitando estruturas genéricas ou acopladas demais.

---

## 🧠 Core

A pasta `core/` concentra tudo que deve existir **uma única vez** na aplicação.

Exemplos:
- interceptors HTTP
- global error handler
- serviços de observabilidade
- serviços de configuração
- providers globais

**Regra:** nada dentro de `core` deve depender de `features`.

Isso garante:
- inicialização previsível
- fácil manutenção
- menor risco de dependências circulares

---

## 🔁 Shared

A pasta `shared/` contém elementos reutilizáveis entre diferentes features.

Inclui:
- componentes visuais reutilizáveis
- pipes
- diretivas
- utilitários
- tipos e interfaces compartilhadas

**Critério importante:**  
Se algo depende de regra de negócio específica, **não deve** estar em `shared`.

---

## 🧩 Features

A pasta `features/` organiza a aplicação por **domínio funcional**, não por tipo de arquivo.

Cada feature é isolada e contém:
- componentes
- serviços específicos
- módulos
- rotas
- testes

Exemplo:

```
features/
└── exchange/
├── pages/
├── components/
├── services/
├── exchange.module.ts
└── exchange-routing.module.ts
```


Benefícios dessa abordagem:
- facilita remoção ou refatoração de funcionalidades
- reduz impacto de mudanças
- melhora entendimento do domínio

---

## 🧠 Gerenciamento de Estado

O gerenciamento de estado segue uma **abordagem reativa**, utilizando **RxJS**.

Foram utilizados:
- `BehaviorSubject`
- `Observable`
- `combineLatest`
- serviços dedicados de estado

A centralização do estado:
- evita duplicação de lógica
- garante consistência da UI
- facilita testes
- reduz efeitos colaterais

Não foi utilizado NgRx neste projeto por escolha arquitetural consciente, priorizando:
- menor complexidade inicial
- aderência ao contexto
- clareza para o time

---

## 🔌 Services

A pasta `services/` agrupa:
- integrações com BFFs
- chamadas HTTP
- serviços de domínio
- orquestração de dados

Os serviços:
- não conhecem a UI
- expõem dados por meio de observables
- são facilmente mockáveis para testes

---

## 🤝 Integração com Backend (BFF)

A integração com backend segue princípios de:
- contratos bem definidos
- isolamento de chamadas HTTP
- adaptação de dados no frontend quando necessário

Durante dependências externas, a arquitetura permite:
- uso de mocks
- desenvolvimento paralelo
- redução de bloqueios

Essa abordagem reflete a realidade de squads independentes com entregas desacopladas.

---

## ♿ Acessibilidade como Parte da Arquitetura

A acessibilidade é tratada como requisito estrutural, não como ajuste visual.

A arquitetura facilita:
- uso consistente de atributos ARIA
- semântica correta
- reutilização de padrões acessíveis
- testes manuais com leitores de tela

Decisões arquiteturais consideraram limitações reais, como:
- dependência de Design System corporativo
- inconsistências entre plataformas (Android / iOS)
- ausência de dispositivos físicos em alguns cenários

---

## 🧪 Testes

A arquitetura foi pensada para facilitar testes em diferentes níveis:

- **Unitários (Jest)**  
  Testando serviços, lógica e componentes isolados

- **E2E (Cypress)**  
  Validando fluxos críticos da aplicação

A separação de responsabilidades reduz:
- necessidade de mocks complexos
- fragilidade dos testes
- custo de manutenção

---

## 🔄 Observabilidade e Tratamento de Erros

Foi implementado um **Global Error Handler**, responsável por:
- capturar erros não tratados
- padronizar logs
- preparar envio para ferramentas de monitoramento (ex: Datadog)

Essa abordagem:
- aumenta visibilidade de falhas em produção
- reduz tempo de diagnóstico (MTTR)
- evita estados silenciosos de erro, como “tela branca”

---

## 🚀 CI, DX e Sustentabilidade

A arquitetura também considera:
- melhoria de Developer Experience
- redução de tempo de build
- padronização de código
- versionamento semântico automatizado

Essas decisões não impactam apenas o código, mas:
- o ritmo do time
- a previsibilidade das entregas
- a qualidade final do produto

---

## 📌 Considerações Finais

A arquitetura apresentada neste projeto reflete uma atuação frontend madura, com foco em:
- clareza
- responsabilidade
- escalabilidade
- colaboração entre áreas

Ela não busca ser a “arquitetura perfeita”, mas sim **uma arquitetura possível, sustentável e alinhada à realidade de produto**.

---
