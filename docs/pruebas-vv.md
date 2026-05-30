# Pruebas de Verificacion y Validacion - Auth User Service

## Verificacion

### Pruebas de API

| Caso | Endpoint | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| Registro exitoso | `POST /auth/registro` | nombre, email, password | `201`, usuario creado |
| Registro duplicado | `POST /auth/registro` | email existente | `400`, usuario ya existe |
| Login exitoso | `POST /auth/login` | email y password validos | `200`, token JWT |
| Login sin password | `POST /auth/login` | email sin password | `400`, faltan datos |
| Validar token | `GET /auth/validate` | Bearer token valido | `200`, valid true |
| Token faltante | `GET /auth/validate` | sin Authorization | `401`, token requerido |
| Crear perfil | `POST /auth/perfil` | telefono, direccion, ciudad | `200`, perfil creado |
| Consultar perfil | `GET /auth/perfil/datos` | Bearer token valido | `200`, perfil |
| Cambiar rol | `PUT /auth/usuarios/:id/role` | rol permitido | `200`, rol actualizado |
| Cambiar rol no permitido | `PUT /auth/usuarios/:id/role` | rol invalido | `400`, rol no permitido |
| Acceso admin sin rol | `GET /auth/usuarios` | token user | `403`, acceso denegado |

### Pruebas de integracion

| Integracion | Validacion |
| --- | --- |
| Carrito -> Auth | Carrito consume `/auth/validate` y recibe `user.id` |
| Catalogo -> Auth | Catalogo consume `/auth/validate` y valida `role` |
| Ventas/Pagos -> Auth | Ventas consume `/auth/me` para obtener usuario y perfil |
| Envios -> Auth | Envios consume `/auth/perfil/datos` para direccion y telefono |
| Auth -> PostgreSQL | El servicio lee y escribe en `auth.users` y `auth.perfil` |
| Auth -> Email | Recuperacion envia enlace usando `FRONTEND_URL` |

### Validacion de contratos

El contrato de API esta definido en:

```txt
docs/openapi.yaml
```

Cada endpoint documenta:

- Metodo HTTP.
- Ruta.
- Body esperado.
- Respuestas.
- Codigos de error.
- Requisito de JWT.

### Manejo de errores

| Error | Codigo esperado |
| --- | --- |
| Token faltante | `401` |
| Token invalido | `401` |
| Rol sin permiso | `403` |
| Datos incompletos | `400` |
| Usuario duplicado | `400` |
| Error interno | `500` |

## Validacion

### Historias de usuario

1. Como cliente, quiero registrarme para poder comprar productos.
2. Como cliente, quiero iniciar sesion para acceder a mi cuenta.
3. Como cliente, quiero recuperar mi contrasena si la olvido.
4. Como cliente, quiero registrar mi perfil para recibir mis compras.
5. Como administrador, quiero listar usuarios para gestionar la plataforma.
6. Como administrador, quiero cambiar roles para asignar permisos.
7. Como microservicio de carrito, quiero validar un token para asociar el carrito al usuario correcto.
8. Como microservicio de pagos, quiero consultar usuario y perfil para generar venta y factura.

### Criterios de aceptacion

| Historia | Criterio |
| --- | --- |
| Registro | No permite emails duplicados y cifra la contrasena |
| Login | Devuelve JWT si las credenciales son correctas |
| Validacion JWT | Devuelve `valid: true` y datos basicos del usuario |
| Perfil | Crea o actualiza el perfil del usuario autenticado |
| Roles | Solo admin gestiona usuarios |
| Productos | Admin y operador pueden gestionar productos |
| Ventas | Admin, operador y user tienen acceso segun alcance |

### Evidencias sugeridas

Adjuntar capturas de:

- Registro exitoso en Postman.
- Login exitoso con token.
- `/auth/validate` usando JWT.
- `/auth/me` retornando perfil.
- Error `401` sin token.
- Error `403` con usuario sin rol admin.
- Registro creado en tabla `auth.users`.
- Perfil creado en tabla `auth.perfil`.
