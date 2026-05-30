exports.verificarAdmin = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({
      message: "Usuario no autenticado"
    });
  }

  if (req.usuario.role !== "admin") {
    return res.status(403).json({
      message: "Acceso denegado"
    });
  }

  next();
};

exports.verificarProductos = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({
      message: "Usuario no autenticado"
    });
  }

  // Productos solo puede ser gestionado por administradores y operadores.
  const rolesPermitidos = ["admin", "operador"];

  if (!rolesPermitidos.includes(req.usuario.role)) {
    return res.status(403).json({
      message: "Acceso denegado"
    });
  }

  next();
};

exports.verificarVentas = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({
      message: "Usuario no autenticado"
    });
  }

  // Ventas es visible para los tres roles; cada modulo limita el alcance de datos.
  const rolesPermitidos = ["admin", "operador", "user"];

  if (!rolesPermitidos.includes(req.usuario.role)) {
    return res.status(403).json({
      message: "Acceso denegado"
    });
  }

  next();
};
