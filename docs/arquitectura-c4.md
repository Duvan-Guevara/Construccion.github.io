# Diagramas C4 - Auth User Service

## Nivel 1: Contexto

```mermaid
flowchart LR
  Cliente["Cliente / App movil"] --> Auth["Auth User Service"]
  Admin["Administrador"] --> Auth
  Operador["Operador"] --> Auth

  Auth --> DB["Cloud SQL PostgreSQL"]
  Auth --> Mail["Servicio de correo Gmail / SMTP"]

  Cart["Carrito de compras"] --> Auth
  Catalog["Catalogo e inventario"] --> Auth
  Sales["Ventas y pagos"] --> Auth
  Shipping["Notificaciones y envios"] --> Auth
```

## Nivel 2: Contenedores

```mermaid
flowchart TB
  subgraph GoogleCloud["Google Cloud"]
    Run["Cloud Run: auth-user-service"]
    SQL["Cloud SQL PostgreSQL"]
    Secrets["Secret Manager"]
  end

  App["App movil / Frontend"] --> Run
  Other["Otros microservicios"] --> Run
  Run --> SQL
  Run --> Secrets
  Run --> SMTP["SMTP Gmail"]
```

## Nivel 3: Componentes principales

```mermaid
flowchart TB
  Routes["auth.routes.js"] --> AuthController["auth.controller.js"]
  Routes --> PerfilController["perfil.controller.js"]

  AuthController --> AuthService["auth.service.js"]
  PerfilController --> PerfilService["perfil.service.js"]

  AuthService --> UserModel["user.model.js"]
  PerfilService --> PerfilModel["perfil.model.js"]

  AuthMiddleware["auth.middleware.js"] --> Routes
  RoleMiddleware["role.middleware.js"] --> Routes

  UserModel --> DB["auth.users"]
  PerfilModel --> DB2["auth.perfil"]
  AuthService --> Mailer["mailer.js"]
```

## Relaciones con microservicios

| Microservicio | Endpoint consumido | Objetivo |
| --- | --- | --- |
| Carrito | `GET /auth/validate` | Validar usuario autenticado |
| Catalogo | `GET /auth/validate` | Validar rol admin u operador |
| Ventas / Pagos | `GET /auth/validate`, `GET /auth/me` | Asociar orden al usuario y obtener datos |
| Envios / Notificaciones | `GET /auth/me`, `GET /auth/perfil/datos` | Obtener datos de contacto y direccion |
