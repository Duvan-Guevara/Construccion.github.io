const jwt = require("jsonwebtoken");

exports.login = (correo, password) => {

    console.log("🟢 Service ejecutándose");

    if (correo === "admin@gmail.com" && password === "123456") {

        const token = jwt.sign(
            { correo, rol: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return {
            mensaje: "Login exitoso",
            token: token
        };
    }

    return {
        error: "Credenciales incorrectas"
    };
};

exports.registro = (nombre, correo, password, rol) => {

    console.log("🟢 Service registro");

    return {
        mensaje: "Usuario registrado correctamente",
        usuario: {
            nombre,
            correo,
            password,
            rol
        }
    };
};