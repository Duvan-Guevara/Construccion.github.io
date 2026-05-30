const perfilService = require("../services/perfil.service");

// Crear o actualizar perfil
exports.crearPerfil = async (req, res) => {
  try {
    const { telefono, direccion, ciudad, foto } = req.body;
    const user_id = req.usuario.id;

    const perfilExistente = await perfilService.obtenerPerfil(user_id);

    // SI EXISTE → ACTUALIZAR
    if (perfilExistente) {
      const perfilActualizado = await perfilService.actualizarPerfil(
        user_id,
        telefono,
        direccion,
        ciudad,
        foto
      );

      return res.json({
        message: "Perfil actualizado",
        perfil: perfilActualizado
      });
    }

    // SI NO EXISTE → CREAR
    const nuevoPerfil = await perfilService.crearPerfil(
      user_id,
      telefono,
      direccion,
      ciudad,
      foto
    );

    return res.json({
      message: "Perfil creado",
      perfil: nuevoPerfil
    });

  } catch (error) {
    console.error("CREAR PERFIL ERROR COMPLETO:", error);

    return res.status(500).json({
      message: "Error en perfil"
    });
  }
};

// Obtener perfil
exports.obtenerPerfil = async (req, res) => {
  try {
    const user_id = req.usuario.id;

    const perfil = await perfilService.obtenerPerfil(user_id);

    if (!perfil) {
      return res.json({ message: "No existe perfil" });
    }

    return res.json(perfil);

  } catch (error) {
    console.error("OBTENER PERFIL ERROR COMPLETO:", error);

    return res.status(500).json({
      message: "Error obteniendo perfil"
    });
  }
};

// Actualizar perfil
exports.actualizarPerfil = async (req, res) => {
  try {
    const { telefono, direccion, ciudad, foto } = req.body;
    const user_id = req.usuario.id;

    const perfil = await perfilService.actualizarPerfil(
      user_id,
      telefono,
      direccion,
      ciudad,
      foto
    );

    return res.json({
      message: "Perfil actualizado",
      perfil
    });

  } catch (error) {
    console.error("ACTUALIZAR PERFIL ERROR COMPLETO:", error);

    return res.status(500).json({
      message: "Error actualizando perfil"
    });
  }
};