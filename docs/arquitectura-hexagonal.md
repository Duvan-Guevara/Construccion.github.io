# Arquitectura Hexagonal - Auth User Service

El microservicio se puede leer como una arquitectura hexagonal aunque el proyecto este organizado con carpetas MVC. La idea principal es separar entradas HTTP, casos de uso, dominio y salidas externas.

## Diagrama

```mermaid
flowchart LR
  subgraph Entradas["Puertos de entrada"]
    HTTP["REST API Express"]
    JWTGuard["Middleware JWT"]
    RoleGuard["Middleware roles"]
  end

  subgraph Aplicacion["Casos de uso"]
    Register["Registrar usuario"]
    Login["Iniciar sesion"]
    Validate["Validar token"]
    Profile["Gestionar perfil"]
    Reset["Recuperar contrasena"]
    Roles["Administrar roles"]
  end

  subgraph Dominio["Dominio"]
    User["Usuario"]
    Perfil["Perfil"]
    Role["Rol"]
    Token["Token JWT"]
  end

  subgraph Salidas["Puertos de salida"]
    UserRepo["Repositorio de usuarios"]
    PerfilRepo["Repositorio de perfil"]
    MailPort["Puerto de correo"]
    TokenPort["Puerto de tokens"]
  end

  subgraph Adaptadores["Adaptadores externos"]
    Postgres["PostgreSQL auth.users / auth.perfil"]
    SMTP["Nodemailer / Gmail"]
    JWT["jsonwebtoken"]
    Bcrypt["bcrypt"]
  end

  HTTP --> Register
  HTTP --> Login
  HTTP --> Validate
  HTTP --> Profile
  HTTP --> Reset
  JWTGuard --> Validate
  RoleGuard --> Roles

  Register --> User
  Login --> User
  Profile --> Perfil
  Roles --> Role
  Validate --> Token

  User --> UserRepo
  Perfil --> PerfilRepo
  Reset --> MailPort
  Login --> TokenPort

  UserRepo --> Postgres
  PerfilRepo --> Postgres
  MailPort --> SMTP
  TokenPort --> JWT
  Register --> Bcrypt
  Reset --> Bcrypt
```

## Puertos de entrada

- `POST /auth/registro`
- `POST /auth/login`
- `GET /auth/validate`
- `GET /auth/me`
- `POST /auth/perfil`
- `GET /auth/perfil/datos`
- `PUT /auth/perfil/actualizar`
- `POST /auth/forgot-password`
- `POST /auth/reset`
- Rutas administrativas protegidas por rol admin

## Puertos de salida

- PostgreSQL para persistencia de usuarios y perfiles.
- SMTP para correos de recuperacion.
- JWT para creacion y validacion de tokens.
- bcrypt para cifrado de contrasenas.

## Adaptadores

- `src/routes`: adaptador HTTP de entrada.
- `src/controllers`: coordinacion entre HTTP y casos de uso.
- `src/services`: casos de uso y reglas de negocio.
- `src/models`: adaptador de persistencia PostgreSQL.
- `src/utils/mailer.js`: adaptador de correo.
- `src/middlewares`: adaptadores de seguridad.
