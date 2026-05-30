const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),
};

// En Cloud Run se usa el socket interno de Cloud SQL si existe INSTANCE_CONNECTION_NAME.
if (process.env.INSTANCE_CONNECTION_NAME) {
  config.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

// En local o por IP publica se usa DB_HOST.
else if (process.env.DB_HOST) {
  config.host = process.env.DB_HOST;

  // En produccion por IP publica, SSL evita conexiones sin cifrar.
  if (isProduction) {
    config.ssl = {
      rejectUnauthorized: false,
    };
  }
}

// Fallback para desarrollo local.
else {
  config.host = "localhost";
}

// Validacion temprana para detectar variables de entorno faltantes.
if (!config.user || !config.database || !config.password) {
  console.error("Faltan variables de entorno de base de datos");
  console.error({
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD ? "CARGADA" : "NO CARGADA",
    DB_PORT: process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    INSTANCE_CONNECTION_NAME: process.env.INSTANCE_CONNECTION_NAME,
  });
}

const pool = new Pool(config);

pool.on("connect", () => {
  console.log("Conectado a PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Error inesperado en PostgreSQL:", err);
});

module.exports = pool;
