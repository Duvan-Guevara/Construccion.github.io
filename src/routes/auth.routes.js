const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
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

// Nueva Contraseña 
router.post("/reset", authController.resetPassword);

// Recuperar Contraseña
router.post("/forgot-password", authController.forgotPassword);

// Guardar perfil
router.post("/perfil", verificarToken, perfilController.crearPerfil);

// Obtener Perfil
router.get("/perfil/datos", verificarToken, perfilController.obtenerPerfil);

// Actualizar perfil
router.put("/perfil/actualizar", verificarToken, perfilController.actualizarPerfil);

// Panel del Administrador 
router.get("/usuarios", authMiddleware.verificarToken, roleMiddleware.verificarAdmin, authController.obtenerUsuarios);

// Cambiar rol
router.put("/usuarios/:id/role", authMiddleware.verificarToken, roleMiddleware.verificarAdmin, authController.cambiarRol);

// Eliminar usuario
router.delete("/usuarios/:id", authMiddleware.verificarToken, roleMiddleware.verificarAdmin, authController.eliminarUsuario);

// Obtener datos del usuario (ruta protegida)
router.get("/perfil", verificarToken, (req, res) => {
  res.json({
    mensaje: "Ruta protegida 🔐",
    usuario: req.usuario
  });
});

// Ruta de Admin 
router.get(
  "/admin",
  authMiddleware.verificarToken,
  roleMiddleware.verificarAdmin,
  (req, res) => {

    res.json({
      message: "Bienvenido Admin"
    });

  }
);

module.exports = router;
