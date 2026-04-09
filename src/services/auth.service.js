const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

// Registar
exports.register = async (nombre, email, password) => {
  try {
    // verificar si existe
    const userExists = await userModel.findByEmail(email);

    if (userExists) {
      return { error: "El usuario ya existe" };
    }

    // encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // guardar en BD
    const newUser = await userModel.createUser(
      nombre,
      email,
      hashedPassword
    );

    return {
      message: "Usuario creado correctamente",
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email
      }
    };

  } catch (error) {
    console.error("SERVICE REGISTER ERROR:", error.message);
    return { error: "Error en registro" };
  }
};


// Login
exports.login = async (email, password) => {
  try {
    // buscar usuario
    const user = await userModel.findByEmail(email);

    if (!user) {
      return { error: "Usuario no existe" };
    }

    // comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { error: "Contraseña incorrecta" };
    }

    // generar token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nombre: user.nombre
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    };

  } catch (error) {
    console.error("SERVICE LOGIN ERROR:", error.message);
    return { error: "Error en login" };
  }
};