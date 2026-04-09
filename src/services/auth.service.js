const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");


// ========================
// 🔑 LOGIN REAL
// ========================
exports.login = async (correo, password) => {
  try {
    // 1. buscar usuario en la BD
    const user = await userModel.findByEmail(correo);

    if (!user) {
      return { error: "Usuario no existe" };
    }

    // 2. comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { error: "Credenciales incorrectas" };
    }

    // 3. generar token
    const token = jwt.sign(
      {
        id: user.id,
        correo: user.email,
        nombre: user.nombre,
        rol: user.rol || "user"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        correo: user.email,
        rol: user.rol || "user"
      }
    };

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return { error: "Error en login" };
  }
};



// ========================
// 🔐 REGISTRO REAL
// ========================
exports.registro = async (nombre, correo, password, rol = "user") => {
  try {
    console.log("🟢 Service registro");

    // 1. verificar si ya existe
    const userExists = await userModel.findByEmail(correo);

    if (userExists) {
      return { error: "El usuario ya existe" };
    }

    // 2. encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. guardar en la BD
    const newUser = await userModel.createUser(
      nombre,
      correo,
      hashedPassword,
      rol
    );

    return {
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: newUser.id,
        nombre: newUser.nombre,
        correo: newUser.email,
        rol: newUser.rol
      }
    };

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return { error: "Error en registro" };
  }
};