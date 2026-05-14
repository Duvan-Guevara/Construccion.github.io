const express = require("express");

const router = express.Router();

const productController =
  require("../controllers/product.controller");

const authMiddleware =
  require("../middlewares/auth.middleware");

// CREAR PRODUCTO
router.post("/", authMiddleware.verificarToken, productController.crearProducto);

// OBTENER PRODUCTOS
router.get("/", productController.obtenerProductos);

// ELIMINAR PRODUCTO
router.delete("/:id", authMiddleware.verificarToken, productController.eliminarProducto);

// ACTUALIZAR PRODUCTO
router.put("/:id", authMiddleware.verificarToken, productController.actualizarProducto);

module.exports = router;