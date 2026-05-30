exports.manejarErrores = (err, req, res, next) => {
  console.error("❌ ERROR DETECTADO COMPLETO:", err);

  res.status(err.status || 500).json({
    error: "Error interno del servidor",
    message: err.message || "Error desconocido"
  });
};