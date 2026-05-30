const jwt = require("jsonwebtoken");

exports.verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token requerido"
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Formato de token inválido"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token no proporcionado"
      });
    }

    // Verifica la firma y expiracion del JWT antes de permitir rutas protegidas.
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Deja el usuario decodificado disponible para controladores y middlewares de rol.
    req.usuario = decoded;

    next();

  } catch (error) {
    console.error("TOKEN ERROR:", error.message);

    return res.status(401).json({
      message: "Token inválido"
    });
  }
};
