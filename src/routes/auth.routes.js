const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { verificarToken } = require("../middlewares/auth.middleware");
const perfilController = require("../controllers/perfil.controller");
const roleMiddleware = require("../middlewares/role.middleware");

// Registro
router.post("/registro", authController.register);

// Login
router.post("/login", authController.login);

// Validar token para otros microservicios
router.get("/validate", verificarToken, authController.validateToken);

// Obtener usuario autenticado con perfil
router.get("/me", verificarToken, authController.me);

// Nueva contraseña
router.post("/reset", authController.resetPassword);

// Recuperar contraseña
router.post("/forgot-password", authController.forgotPassword);

// Guardar perfil
router.post("/perfil", verificarToken, perfilController.crearPerfil);

// Obtener perfil
router.get("/perfil/datos", verificarToken, perfilController.obtenerPerfil);

// Actualizar perfil
router.put("/perfil/actualizar", verificarToken, perfilController.actualizarPerfil);

// Panel del administrador
router.get(
  "/usuarios",
  verificarToken,
  roleMiddleware.verificarAdmin,
  authController.obtenerUsuarios
);

// Cambiar rol
router.put(
  "/usuarios/:id/role",
  verificarToken,
  roleMiddleware.verificarAdmin,
  authController.cambiarRol
);

// Eliminar usuario
router.delete(
  "/usuarios/:id",
  verificarToken,
  roleMiddleware.verificarAdmin,
  authController.eliminarUsuario
);

// Ruta protegida de prueba
router.get("/perfil", verificarToken, (req, res) => {
  res.json({
    mensaje: "Ruta protegida 🔐",
    usuario: req.usuario
  });
});

// Ruta de admin
router.get(
  "/admin",
  verificarToken,
  roleMiddleware.verificarAdmin,
  (req, res) => {
    res.json({
      message: "Bienvenido Admin"
    });
  }
);

module.exports = router;