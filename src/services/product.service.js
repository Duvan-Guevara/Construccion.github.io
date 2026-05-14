const productModel =
  require("../models/product.model");

// CREAR
exports.crearProducto = async (
  nombre,
  descripcion,
  precio,
  stock,
  imagen,
  user_id
) => {

  return await productModel.crearProducto(
    nombre,
    descripcion,
    precio,
    stock,
    imagen,
    user_id
  );
};

// OBTENER
exports.obtenerProductos = async () => {

  return await productModel.obtenerProductos();
};

// ELIMINAR
exports.eliminarProducto = async (id) => {

  return await productModel.eliminarProducto(id);
};

// ACTUALIZAR
exports.actualizarProducto = async (
  id,
  nombre,
  descripcion,
  precio,
  stock,
  imagen
) => {

  return await productModel.actualizarProducto(
    id,
    nombre,
    descripcion,
    precio,
    stock,
    imagen
  );
};