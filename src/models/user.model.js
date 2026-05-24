const pool = require("../config/db");

// Crear un Usuario
exports.createUser = async (nombre, email, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO auth.users (nombre, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [nombre, email, hashedPassword, "user"]
  );

  return result.rows[0];
};

// Buscar por Email
exports.findByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM auth.users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

// Buscar token del Usuario
exports.findByToken = async (token) => {
  const query = `
    SELECT * FROM auth.users 
    WHERE reset_token = $1 
    AND reset_expires > NOW()
  `;

  const result = await pool.query(query, [token]);
  return result.rows[0];
};

// Actualizar Password
exports.actualizarPassword = async (email, password) => {
  const query = `
    UPDATE auth.users 
    SET password = $1, reset_token = NULL, reset_expires = NULL
    WHERE email = $2
  `;
  await pool.query(query, [password, email]);
};

exports.saveResetToken = async (email, token, expires) => {
  const query = `
    UPDATE auth.users
    SET reset_token = $1, reset_expires = $2
    WHERE email = $3
  `;

  await pool.query(query, [token, expires, email]);
};

exports.obtenerUsuarios = async () => {

  const query = `
    SELECT id, nombre, email, role
    FROM auth.users
    ORDER BY id ASC
  `;

  const result = await pool.query(query);

  return result.rows;
};

// Cambiar rol
exports.cambiarRol = async (id, role) => {

  const query = `
    UPDATE auth.users
    SET role = $1
    WHERE id = $2
    RETURNING *
  `;

  const result =
    await pool.query(query, [role, id]);

  return result.rows[0];
};

// Eliminar usuario
exports.eliminarUsuario = async (id) => {

  const query = `
    DELETE FROM auth.users
    WHERE id = $1
  `;

  await pool.query(query, [id]);
};
