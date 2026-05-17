const perfilService = require("../services/perfil.service");

// Crera Perfil
exports.crearPerfil = async (req, res) => {

  try {

    const { telefono, direccion, ciudad, foto } = req.body;

    const user_id = req.usuario.id;

    // 🔥 buscar si ya existe perfil
    const perfilExistente =
      await perfilService.obtenerPerfil(user_id);

    // SI EXISTE → ACTUALIZAR
    if (perfilExistente) {

      const perfilActualizado =
        await perfilService.actualizarPerfil(
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
    const nuevoPerfil =
      await perfilService.crearPerfil(
        user_id,
        telefono,
        direccion,
        ciudad,
        foto
      );

    res.json({
      message: "Perfil creado",
      perfil: nuevoPerfil
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error en perfil"
    });

  }

};

// Obtener Perfil
exports.obtenerPerfil = async (req, res) => {
  const user_id = req.usuario.id;

  const perfil = await perfilService.obtenerPerfil(user_id);

  if (!perfil) {
    return res.json({ message: "No existe perfil" });
  }

  res.json(perfil);
};

// Actulizar Perfil
exports.actualizarPerfil = async (req, res) => {
  const { telefono, direccion, ciudad, foto } = req.body;
  const user_id = req.usuario.id;

  const perfil = await perfilService.actualizarPerfil(
    user_id,
    telefono,
    direccion,
    ciudad,
    foto
  );

  res.json({ message: "Perfil actualizado", perfil });
};