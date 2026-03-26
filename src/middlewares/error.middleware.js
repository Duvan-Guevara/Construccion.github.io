exports.manejarErrores = (err, req, res, next) => {
    console.error("Error detectado:", err.message);

    res.status(500).json({
        error: "Error interno del servidor"
    });
};