const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Importa Archivos del middlewares
const logger = require("./src/middlewares/logger.middleware");
const errorMiddleware = require("./src/middlewares/error.middleware");
const authRoutes = require("./src/routes/auth.routes");

app.use(cors()); //Fronted HTML se conecte
app.use(express.json()); // permite Recibir Json

// Muetra por consola cada petición
app.use(logger.logger);

// Rutas
app.use("/api", authRoutes);

// Manejo de errores (SIEMPRE AL FINAL)
app.use(errorMiddleware.manejarErrores);

// 🔥 5. Servidor (Arranque en el puerto)
app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.PORT);
});