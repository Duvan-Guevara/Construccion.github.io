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

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Error handler (Captura Errores del sistema)
const errorMiddleware = require("./src/middlewares/error.middleware");
app.use(errorMiddleware.manejarErrores);

//Gestion de productos del panel
const productRoutes =require("./src/routes/product.routes");
app.use("/products", productRoutes);

// Server
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});