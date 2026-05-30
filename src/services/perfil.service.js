const perfilModel = require("../models/perfil.model");

// Crear Perfil
exports.crearPerfil = async (user_id, telefono, direccion, ciudad, foto) => {
  return await perfilModel.crearPerfil(user_id, telefono, direccion, ciudad, foto);
};

// Obtener Datos del Perfil
exports.obtenerPerfil = async (user_id) => {
  return await perfilModel.obtenerPerfil(user_id);
};

// Actualizar Perfil
exports.actualizarPerfil = async (user_id, telefono, direccion, ciudad, foto) => {
  return await perfilModel.actualizarPerfil(user_id, telefono, direccion, ciudad, foto);
};