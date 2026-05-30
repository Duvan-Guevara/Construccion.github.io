const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const { sendRecoveryEmail } = require("../utils/mailer");

// Registrar
exports.register = async (nombre, email, password) => {
  try {
    const userExists = await userModel.findByEmail(email);

    if (userExists) {
      return { error: "El usuario ya existe" };
    }

    // La contrasena nunca se guarda en texto plano.
    const hashedPassword = await bcrypt.hash(password, 10);

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
        email: newUser.email,
        role: newUser.role
      }
    };

  } catch (error) {
    console.error("SERVICE REGISTER ERROR COMPLETO:", error);
    return { error: "Error en registro" };
  }
};

// Login
exports.login = async (email, password) => {
  try {
    const user = await userModel.findByEmail(email);

    if (!user) {
      return { error: "Usuario no existe" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { error: "Contraseña incorrecta" };
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET no está configurado en variables de entorno");
      return { error: "JWT_SECRET no configurado" };
    }

    // El JWT contiene solo datos minimos para identificar usuario y rol.
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
    console.error("SERVICE LOGIN ERROR COMPLETO:", error);
    return { error: "Error en login" };
  }
};

// Recuperar contraseña
exports.forgotPassword = async (email) => {
  try {
    const user = await userModel.findByEmail(email);

    if (!user) {
      return { error: "Usuario no existe" };
    }

    // Token temporal usado solo para restablecer contrasena.
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);

    await userModel.saveResetToken(email, token, expires);

    const frontendUrl = process.env.FRONTEND_URL;

    if (!frontendUrl) {
      console.error("❌ FRONTEND_URL no está configurado");
      return { error: "FRONTEND_URL no configurado" };
    }

    const link = `${frontendUrl}/reset.html?token=${token}`;

    await sendRecoveryEmail(email, link);

    console.log("Correo enviado a:", email);

    return { message: "Correo enviado" };

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR COMPLETO:", error);
    return { error: "Error en recuperación" };
  }
};

// Nueva contraseña
exports.resetPassword = async (token, newPassword) => {
  try {
    const user = await userModel.findByToken(token);

    if (!user) {
      return { error: "Token inválido" };
    }

    if (new Date() > user.reset_expires) {
      return { error: "Token expirado" };
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await userModel.actualizarPassword(user.email, hashed);

    return { message: "Contraseña actualizada" };

  } catch (error) {
    console.error("RESET PASSWORD ERROR COMPLETO:", error);
    return { error: "Error actualizando contraseña" };
  }
};

// Obtener usuarios
exports.obtenerUsuarios = async () => {
  try {
    const usuarios = await userModel.obtenerUsuarios();
    return usuarios;

  } catch (error) {
    console.error("OBTENER USUARIOS SERVICE ERROR COMPLETO:", error);
    throw error;
  }
};

// Cambiar rol
exports.cambiarRol = async (id, role) => {
  try {
    const rolesPermitidos = ["admin", "operador", "user"];

    if (!rolesPermitidos.includes(role)) {
      return { error: "Rol no permitido" };
    }

    return await userModel.cambiarRol(id, role);

  } catch (error) {
    console.error("CAMBIAR ROL SERVICE ERROR COMPLETO:", error);
    throw error;
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (id) => {
  try {
    return await userModel.eliminarUsuario(id);

  } catch (error) {
    console.error("ELIMINAR USUARIO SERVICE ERROR COMPLETO:", error);
    throw error;
  }
};
