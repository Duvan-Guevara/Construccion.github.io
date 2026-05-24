exports.verificarAdmin = (req, res, next) => {

  if (req.usuario.role !== "admin") {
    return res.status(403).json({
      message: "Acceso denegado"
    });
  }

  next();
};

exports.verificarProductos = (req, res, next) => {
  const rolesPermitidos = ["admin", "operador"];

  if (!rolesPermitidos.includes(req.usuario.role)) {
    return res.status(403).json({
      message: "Acceso denegado"
    });
  }

  next();
};

exports.verificarVentas = (req, res, next) => {
  const rolesPermitidos = ["admin", "operador", "user"];

  if (!rolesPermitidos.includes(req.usuario.role)) {
    return res.status(403).json({
      message: "Acceso denegado"
    });
  }

  next();
};
