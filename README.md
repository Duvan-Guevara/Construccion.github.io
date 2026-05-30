# Auth User Service - Mackend Marketplace

Microservicio encargado de registro, inicio de sesion, recuperacion de contrasena, roles, permisos y perfil de usuario para el ecosistema de e-commerce Mackend Marketplace.

## Objetivo

Centralizar la identidad del usuario y entregar a los demas microservicios la validacion de JWT, datos basicos de usuario, rol y perfil.

## Tecnologias

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- nodemailer
- Docker
- Cloud Run
- Cloud SQL

## Roles

| Rol | Usuarios | Productos | Ventas |
| --- | --- | --- | --- |
| admin | Si | Si | Si |
| operador | No | Si | Si |
| user | No | No | Si |

## Instalacion local

```bash
npm install
```

Copia las variables de entorno:

```bash
cp .env.example .env
```

Configura `.env` con tus credenciales locales.

## Ejecucion local

```bash
npm run dev
```

Por defecto el servicio corre en:

```txt
http://localhost:4001
```

## Ejecucion con Docker Compose

```bash
docker compose up --build
```

Esto levanta:

- `auth-user-service`
- `postgres`

## Variables de entorno

| Variable | Descripcion |
| --- | --- |
| PORT | Puerto del servicio |
| DB_HOST | Host de PostgreSQL local |
| DB_PORT | Puerto de PostgreSQL |
| DB_NAME | Nombre de la base |
| DB_USER | Usuario de base de datos |
| DB_PASSWORD | Contrasena de base de datos |
| JWT_SECRET | Llave privada para firmar JWT |
| EMAIL_USER | Correo usado para recuperacion |
| EMAIL_PASS | Clave de aplicacion del correo |
| FRONTEND_URL | URL del frontend para reset de contrasena |
| INSTANCE_CONNECTION_NAME | Connection name de Cloud SQL |

## Endpoints principales

| Metodo | Ruta | Descripcion | Auth |
| --- | --- | --- | --- |
| POST | `/auth/registro` | Registra usuario | No |
| POST | `/auth/login` | Inicia sesion | No |
| GET | `/auth/validate` | Valida JWT para microservicios | Si |
| GET | `/auth/me` | Retorna usuario y perfil | Si |
| POST | `/auth/forgot-password` | Solicita recuperacion | No |
| POST | `/auth/reset` | Cambia contrasena | No |
| POST | `/auth/perfil` | Crea o actualiza perfil | Si |
| GET | `/auth/perfil/datos` | Consulta perfil | Si |
| PUT | `/auth/perfil/actualizar` | Actualiza perfil | Si |
| GET | `/auth/usuarios` | Lista usuarios | Admin |
| PUT | `/auth/usuarios/:id/role` | Cambia rol | Admin |
| DELETE | `/auth/usuarios/:id` | Elimina usuario | Admin |
| GET | `/auth/admin` | Valida acceso admin | Admin |

## Dependencias con otros microservicios

Este servicio entrega identidad y perfil a:

- Carrito de compras: consume `/auth/validate`.
- Catalogo e inventario: consume `/auth/validate` para validar roles.
- Ventas y pagos: consume `/auth/validate` y `/auth/me`.
- Notificaciones y envios: consume `/auth/me` o `/auth/perfil/datos`.

## Documentacion adicional

- Swagger/OpenAPI: `docs/openapi.yaml`
- Diagramas C4: `docs/arquitectura-c4.md`
- Arquitectura hexagonal: `docs/arquitectura-hexagonal.md`
- Pruebas V&V: `docs/pruebas-vv.md`
- Coleccion Postman: `postman/Auth_User_Service.postman_collection.json`

## Despliegue en Google Cloud

El servicio esta preparado para Cloud Run. La base debe estar en Cloud SQL PostgreSQL y debe existir el schema:

```txt
auth.users
auth.perfil
```

El contenedor debe recibir variables de entorno y secretos desde Secret Manager. No se debe subir `.env` al repositorio ni al contenedor.
