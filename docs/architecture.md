# Architecture Overview

This document describes the architectural decisions, structure, and principles adopted in this Angular project.

The goal of this architecture is to support:
- scalability
- maintainability
- testability
- accessibility
- predictable state and behavior

The structure reflects patterns commonly used in **large-scale frontend applications**.

---

## 🧠 Architectural Principles

The architecture is guided by the following principles:

### 1. Separation of Concerns
Each layer has a clear responsibility, avoiding mixing UI, business logic, and infrastructure concerns.

### 2. Domain-Oriented Structure
Features are organized by **business domain**, not by technical type.  
This improves discoverability and reduces cognitive load as the application grows.

### 3. Explicit Dependencies
Dependencies flow in a single direction:
- UI → Application Logic → Infrastructure
- Shared and Core layers never depend on Features

### 4. Progressive Complexity
The architecture supports growth without introducing unnecessary abstraction upfront.

---

## 🗂️ Folder Structure

```
src/app
├── core
├── shared
├── features
├── state
```

Each folder represents a specific architectural layer.

---

## 🧩 Core Layer

**Purpose:**  
Contains cross-cutting concerns that affect the entire application.

### Responsibilities:
- Global error handling
- Logging and observability
- HTTP interceptors
- Application-wide services
- Environment-level abstractions

### Examples:

```
core/
├── error-handler/
│ └── global-error-handler.ts
├── interceptors/
│ └── http-error.interceptor.ts
├── logging/
│ └── logger.service.ts
```


### Rules:
- Must not depend on `features`
- Should be framework-aware but domain-agnostic
- Should be initialized once at application bootstrap

---

## 🧱 Shared Layer

**Purpose:**  
Holds reusable, domain-agnostic building blocks.

### Responsibilities:
- UI components
- Pipes and directives
- Utility functions
- Design system abstractions

### Examples:

```
shared/
├── components/
│ ├── loading/
│ ├── alert/
│ └── bottom-sheet/
├── directives/
├── pipes/
├── utils/
```


### Rules:
- No business logic
- No direct API calls
- Must be reusable across multiple domains

---

## 🧭 Features Layer

**Purpose:**  
Represents **business domains and user journeys**.

Each feature is self-contained and owns:
- its components
- its services
- its routing
- its business logic

### Example:

```
features/
├── exchange/
│ ├── pages/
│ ├── components/
│ ├── services/
│ ├── exchange-routing.module.ts
│ └── exchange.module.ts
```


### Characteristics:
- Clear boundaries between features
- Lazy-loading friendly
- Easier to refactor or remove entire domains

### Rules:
- Features may depend on `shared` and `state`
- Features must not depend on other features directly

---

## 🔄 State Layer

**Purpose:**  
Centralize shared state using a **reactive RxJS-based approach**.

This layer avoids over-engineering (e.g. full NgRx) while still ensuring:
- predictable data flow
- explicit state ownership
- UI consistency

### Example:

```
state/
├── user/
│ └── user-state.service.ts
├── exchange/
│ └── exchange-state.service.ts
```


### Patterns Used:
- `BehaviorSubject` for state storage
- `Observable` for state consumption
- Immutable state updates

### Why not NgRx?
For the scope of this project, a service-based reactive state:
- reduces boilerplate
- improves onboarding
- keeps complexity proportional

The architecture, however, allows future migration if needed.

---

## ♿ Accessibility by Design

Accessibility is considered **at the architectural level**, not only in components.

Key decisions:
- Semantic HTML over div-based layouts
- Accessible shared components
- Keyboard navigation built into base components
- Screen reader testing as part of development

Accessibility guidelines are detailed in [`accessibility.md`](accessibility.md).

---

## 🧪 Testability Considerations

The architecture supports testing by:
- isolating business logic in services
- avoiding logic inside templates
- keeping components thin
- enabling easy mocking of dependencies

This allows:
- fast unit tests
- stable E2E tests
- clearer test boundaries

---

## 📈 Scalability & Maintainability

This structure enables:
- adding new features without touching existing ones
- onboarding new developers faster
- parallel work across squads
- clearer ownership boundaries

The architecture intentionally mirrors patterns used in enterprise-grade Angular applications.

---

## 📌 Summary

This architecture is designed to:
- scale with team size and complexity
- encourage best practices
- support accessibility, testing, and observability
- reflect real-world frontend engineering challenges

It prioritizes **clarity over cleverness** and **engineering discipline over shortcuts**.
