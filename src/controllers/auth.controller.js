const authService = require("../services/auth.service");

// Registrar
exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const result = await authService.register(nombre, email, password);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    return res.status(201).json(result);

  } catch (error) {
    console.error("REGISTER ERROR:", error.message);
    return res.status(500).json({ message: "Error en registro" });
  }
};


// Login 
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const result = await authService.login(email, password);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    console.log("✅ Login exitoso");

    return res.json(result);

  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    return res.status(500).json({ message: "Error en login" });
  }
};

//  Recuperar Contraseña 
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Falta el email" });
    }

    const result = await authService.forgotPassword(email);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.json({ message: "Correo enviado correctamente" });

  } catch (error) {
    console.error("ERROR forgotPassword:", error);
    res.status(500).json({ message: "Error al enviar correo" });
  }
};

// Nueva Contraseña 
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    if (!token || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const result = await authService.resetPassword(token, password);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.json(result);

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error.message);
    res.status(500).json({ message: "Error al actualizar contraseña" });
  }
};

// Obtener usuarios en el panel 
exports.obtenerUsuarios = async (req, res) => {

  try {

    const usuarios =
      await authService.obtenerUsuarios();

    res.json(usuarios);

  } catch (error) {

    res.status(500).json({
      message: "Error obteniendo usuarios"
    });
  }
};

// Cambiar rol
exports.cambiarRol = async (req, res) => {

  try {

    const { id } = req.params;
    const { role } = req.body;

    const usuario =
      await authService.cambiarRol(id, role);

    res.json({
      message: "Rol actualizado",
      usuario
    });

  } catch (error) {

    res.status(500).json({
      message: "Error cambiando rol"
    });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {

  try {

    const { id } = req.params;

    await authService.eliminarUsuario(id);

    res.json({
      message: "Usuario eliminado"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error eliminando usuario"
    });
  }
};


