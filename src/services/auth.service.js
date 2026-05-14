const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const { sendRecoveryEmail } = require("../utils/mailer");

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
        nombre: user.nombre,
        role: user.role
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
        email: user.email,
        role: user.role
      }
    };

  } catch (error) {
    console.error("SERVICE LOGIN ERROR:", error.message);
    return { error: "Error en login" };
  }
};

// Recuperar Contraseña
exports.forgotPassword = async (email) => {
  try {
    const user = await userModel.findByEmail(email);

    if (!user) {
      return { error: "Usuario no existe" };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);

    await userModel.saveResetToken(email, token, expires);

    const link = `http://localhost:3000/reset.html?token=${token}`;

    // 📩 enviar correo
    await sendRecoveryEmail(email, link);

    console.log("Correo enviado a:", email);

    return { message: "Correo enviado" };

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error.message);
    return { error: "Error en recuperación" };
  }
};

// Nueva Contraseña  
exports.resetPassword = async (token, newPassword) => {

  const user = await userModel.findByToken(token);

  if (!user) {
    return { error: "Token inválido" };
  }

  // verificar expiración
  if (new Date() > user.reset_expires) {
    return { error: "Token expirado" };
  }

  // encriptar nueva contraseña
  const hashed = await bcrypt.hash(newPassword, 10);

  await userModel.actualizarPassword(user.email, hashed);

  return { message: "Contraseña actualizada" };
};

// Obtener usuarios
exports.obtenerUsuarios = async () => {

  const usuarios =
    await userModel.obtenerUsuarios();

  return usuarios;
};

// Cambiar rol
exports.cambiarRol = async (id, role) => {

  return await userModel.cambiarRol(id, role);
};

// Eliminar usuario
exports.eliminarUsuario = async (id) => {

  return await userModel.eliminarUsuario(id);
};