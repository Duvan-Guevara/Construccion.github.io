const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");


// ========================
// 🔐 AUTH BASICO
// ========================

// REGISTER
router.post("/registro", authController.register);

// LOGIN
router.post("/login", authController.login);


// ========================
// 🔐 RUTA PROTEGIDA
// ========================
router.get("/perfil", authMiddleware.verificarToken, (req, res) => {
  res.json({
    mensaje: "Ruta protegida 🔐",
    usuario: req.usuario
  });
});


// ⚠️ OPCIONAL (solo si ya existen en controller)
// Si NO los tienes, COMENTA estas rutas

/*
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
*/


module.exports = router;