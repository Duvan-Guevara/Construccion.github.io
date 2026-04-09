const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger (ANTES de rutas)
const logger = require("./src/middlewares/logger.middleware");
app.use(logger.logger);

// Rutas
const authRoutes = require("./src/routes/auth.routes");
app.use("/auth", authRoutes);

// Error handler (SIEMPRE AL FINAL)
const errorMiddleware = require("./src/middlewares/error.middleware");
app.use(errorMiddleware.manejarErrores);

// Server
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});