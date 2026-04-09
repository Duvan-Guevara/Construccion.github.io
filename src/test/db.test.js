const pool = require("../config/db");

pool.query("SELECT NOW()")
  .then(res => {
    console.log("✅ PostgreSQL conectado:", res.rows[0]);
  })
  .catch(err => {
    console.error("❌ Error DB:", err);
  });