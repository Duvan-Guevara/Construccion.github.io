const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// middleware aplicado para login
router.post("/login", authMiddleware.verificarLogin, authController.login);

// middleware aplicado para el registro
router.post("/registro", authController.registro);

module.exports = router;

// Se agrega el token 
router.get("/perfil", authMiddleware.verificarToken, (req, res) => {
    res.json({
        mensaje: "Ruta protegida 🔐",
        usuario: req.usuario
    });
});