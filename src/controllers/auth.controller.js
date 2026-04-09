const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");


// ========================
// 🔐 REGISTER
// ========================
exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // 1. validar datos
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // 2. verificar si existe usuario
    const userExists = await userModel.findByEmail(email);

    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // 3. encriptar password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. guardar usuario en DB (AHORA CON NOMBRE)
    const newUser = await userModel.createUser(nombre, email, hashedPassword);

    return res.status(201).json({
      message: "Usuario creado correctamente",
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Error en registro" });
  }
};


// ========================
// 🔑 LOGIN
// ========================

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. validar datos
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // 2. buscar usuario en PostgreSQL
    const user = await userModel.findByEmail(email);

    if (!user) {
      console.log("❌ Usuario no existe.");
      return res.status(400).json({ message: "Usuario no existe" });
    }

    // 3. comparar password con bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Contraseña incorrecta.");
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

     console.log("✅ Login exitoso:");

    // 4. generar JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nombre: user.nombre
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Error en login" });
  }
};