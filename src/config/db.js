const { Pool } = require("pg");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),
};

if (process.env.INSTANCE_CONNECTION_NAME) {
  config.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
} else {
  config.host = process.env.DB_HOST || "localhost";
}

const pool = new Pool(config);

module.exports = pool;
