const pool = require("../config/db");

// Crear Pefil
exports.crearPerfil = async (user_id, telefono, direccion, ciudad, foto) => {
  const query = `
    INSERT INTO perfil (user_id, telefono, direccion, ciudad, foto)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const result = await pool.query(query, [user_id, telefono, direccion, ciudad, foto]);
  return result.rows[0];
};

// Obtener Perfil
exports.obtenerPerfil = async (user_id) => {
  const query = `SELECT * FROM perfil WHERE user_id = $1`;
  const result = await pool.query(query, [user_id]);
  return result.rows[0];
};

// Actualizar Perfil
exports.actualizarPerfil = async (user_id, telefono, direccion, ciudad,foto) => {
  const query = `
    UPDATE perfil
    SET telefono = $1, direccion = $2, ciudad = $3, foto = $4
    WHERE user_id = $5
    RETURNING *
  `;

  const result = await pool.query(query, [telefono, direccion, ciudad, foto, user_id]);
  return result.rows[0];
};