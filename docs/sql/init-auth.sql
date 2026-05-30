CREATE SCHEMA IF NOT EXISTS auth;

CREATE TABLE IF NOT EXISTS auth.users (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  reset_token TEXT,
  reset_expires TIMESTAMP,
  role VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS auth.perfil (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  telefono VARCHAR(20),
  direccion TEXT,
  ciudad VARCHAR(100),
  foto TEXT
);
