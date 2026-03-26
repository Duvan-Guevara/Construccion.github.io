const jwt = require("jsonwebtoken");

// Validar datos de login
exports.verificarLogin = (req, res, next) => {

    console.log("🟡 Middleware ejecutándose");

    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({
            error: "Debe enviar correo y contraseña"
        });
    }

    console.log("Middleware: validación básica OK");

    next();
};

// Verificar token JWT
exports.verificarToken = (req, res, next) => {

    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            error: "Token requerido"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = decoded;

        next();

    } catch (error) {
        return res.status(403).json({
            error: "Token inválido"
        });
    }
};