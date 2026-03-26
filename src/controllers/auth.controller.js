const authService = require("../services/auth.service");

exports.login = (req, res) => {

    console.log("🔵 Controller ejecutándose");

    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({
            error: "Faltan datos"
        });
    }

    const resultado = authService.login(correo, password);

    if (resultado.error) {
        return res.status(401).json(resultado);
    }

    res.json(resultado);
};

exports.registro = (req, res) => {
    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password) {
        return res.status(400).json({
            error: "Faltan datos"
        });
    }

    const resultado = authService.registro(nombre, correo, password);

    res.json(resultado);
};