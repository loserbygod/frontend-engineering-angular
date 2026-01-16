> 🇺🇸 English version  
> 🇧🇷 Versão em português: [README.pt-BR.md](README.pt-BR.md)


# Frontend Engineering Angular

A practical Angular project focused on frontend engineering practices, including accessibility, testing, observability, CI quality, DX improvements, and scalable architecture.

---

## 🎯 Project Purpose

This repository was created to demonstrate **real-world frontend engineering practices** applied to Angular applications in complex environments.

The goal is not to showcase UI aesthetics, but to highlight **engineering decisions**, **code organization**, **quality standards**, and **maintainability** concerns commonly found in production systems.

This project reflects how I approach frontend development when working with:
- regulated domains
- cross-functional teams
- quality and reliability requirements
- long-lived codebases

---

## 🧱 Architectural Overview

The application is structured following a **domain-oriented and layered architecture**, aiming to improve scalability, readability, and separation of concerns.

### High-level structure:

```
src/app
├── core        # Cross-cutting concerns (error handling, logging, interceptors)
├── shared      # Reusable, domain-agnostic UI components and utilities
├── features    # Business domains and user journeys
├── state       # Shared reactive state management
```

Each layer has a clear responsibility, avoiding tight coupling and improving testability.

More details can be found in [`docs/architecture.md`](docs/architecture.md).

---

## ♿ Accessibility

Accessibility is treated as a **first-class concern**, not as an afterthought.

The project follows **WCAG 2.1 guidelines**, focusing on:
- keyboard navigation
- screen reader compatibility
- semantic HTML
- accessible custom components

Accessibility decisions and common pitfalls are documented in [`docs/accessibility.md`](docs/accessibility.md).

---

## 🧪 Testing Strategy

The project includes a balanced testing approach:
- **Unit tests** with Jest for business logic and components
- **End-to-end tests** with Cypress for critical user flows
- **BDD-style scenarios** where applicable to align business rules and implementation

Testing decisions and trade-offs are documented in [`docs/testing-strategy.md`](docs/testing-strategy.md).

---

## 🔭 Observability & Error Handling

To improve reliability and debuggability, the project demonstrates:
- a global error handling strategy
- centralized logging services
- integration-ready observability patterns (inspired by tools like Datadog)

The goal is to reduce MTTR and avoid silent failures such as blank screens in production.

More details in [`docs/observability.md`](docs/observability.md).

---

## ⚙️ Developer Experience & Quality

Developer Experience (DX) is actively considered through:
- Hot Module Replacement (HMR)
- optimized test execution
- automated quality checks via Git hooks
- semantic versioning practices

CI/CD concepts and quality gates are described in [`docs/ci-cd.md`](docs/ci-cd.md).

---

## 🧠 State Management

Shared application state is handled using a **reactive RxJS-based approach**, leveraging:
- `BehaviorSubject`
- `Observables`
- centralized state services

This approach was chosen to keep complexity proportional to the project size, avoiding unnecessary overhead while maintaining predictability.

---

## 📚 Documentation

All architectural and engineering decisions are explicitly documented in the `/docs` folder to ensure transparency and knowledge sharing.

---

## 🚀 Getting Started

Instructions for setting up and running the project locally will be added as the implementation evolves.

---

## 💬 Final Notes

This project is intentionally designed to reflect **engineering maturity rather than feature volume**.

It serves as:
- a technical portfolio
- an interview discussion base
- a representation of how I approach frontend engineering in production environments