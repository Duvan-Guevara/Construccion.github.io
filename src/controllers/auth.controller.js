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