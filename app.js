const express = require("express");
const cors = require("cors");
const path = require("path");
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

app.use(express.static(path.join(__dirname, "public")));

// Error handler (Captura Errores del sistema)
const errorMiddleware = require("./src/middlewares/error.middleware");
app.use(errorMiddleware.manejarErrores);


// Server
const PORT = process.env.PORT || 4001;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
