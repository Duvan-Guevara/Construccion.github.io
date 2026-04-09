const pool = require("../config/db");

// ========================
// 👤 CREAR USUARIO
// ========================
exports.createUser = async (nombre, email, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO users (nombre, email, password) VALUES ($1, $2, $3) RETURNING *",
    [nombre, email, hashedPassword]
  );

  return result.rows[0];
};

// ========================
// 🔍 BUSCAR POR EMAIL
// ========================
exports.findByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

// ========================
// 🔄 ACTUALIZAR PASSWORD
// ========================
exports.updatePassword = async (id, password) => {
  await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2",
    [password, id]
  );
};