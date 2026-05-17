const productService =
  require("../services/product.service");

// CREAR PRODUCTO
exports.crearProducto = async (req, res) => {

  try {

    const {
      nombre,
      descripcion,
      precio,
      stock,
      imagen
    } = req.body;

    const user_id =
      req.usuario.id;

    const producto =
      await productService.crearProducto(
        nombre,
        descripcion,
        precio,
        stock,
        imagen,
        user_id
      );

    res.json({
      message: "Producto creado",
      producto
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error creando producto"
    });
  }
};

// OBTENER PRODUCTOS
exports.obtenerProductos = async (req, res) => {

  try {

    const productos =
      await productService.obtenerProductos();

    res.json(productos);

  } catch (error) {

    res.status(500).json({
      message: "Error obteniendo productos"
    });
  }
};

// ELIMINAR PRODUCTO
exports.eliminarProducto = async (req, res) => {

  try {

    const { id } = req.params;

    await productService.eliminarProducto(id);

    res.json({
      message: "Producto eliminado"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error eliminando producto"
    });
  }
};

// ACTUALIZAR PRODUCTO
exports.actualizarProducto = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      nombre,
      descripcion,
      precio,
      stock,
      imagen
    } = req.body;

    const producto =
      await productService.actualizarProducto(
        id,
        nombre,
        descripcion,
        precio,
        stock,
        imagen
      );

    res.json({
      message: "Producto actualizado",
      producto
    });

  } catch (error) {

    res.status(500).json({
      message: "Error actualizando producto"
    });
  }
};