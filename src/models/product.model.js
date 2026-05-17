const pool = require("../config/db");

// CREAR PRODUCTO
exports.crearProducto = async (
  nombre,
  descripcion,
  precio,
  stock,
  imagen,
  user_id
) => {

  const query = `
    INSERT INTO products
    (
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      user_id
    )

    VALUES ($1, $2, $3, $4, $5, $6)

    RETURNING *
  `;

  const result = await pool.query(
    query,
    [
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      user_id
    ]
  );

  return result.rows[0];
};

// OBTENER PRODUCTOS
exports.obtenerProductos = async () => {

  const query = `
    SELECT *
    FROM products
    ORDER BY id DESC
  `;

  const result = await pool.query(query);

  return result.rows;
};

// ELIMINAR PRODUCTO
exports.eliminarProducto = async (id) => {

  const query = `
    DELETE FROM products
    WHERE id = $1
  `;

  await pool.query(query, [id]);
};

// ACTUALIZAR PRODUCTO
exports.actualizarProducto = async (
  id,
  nombre,
  descripcion,
  precio,
  stock,
  imagen
) => {

  const query = `
    UPDATE products

    SET
      nombre = $1,
      descripcion = $2,
      precio = $3,
      stock = $4,
      imagen = $5

    WHERE id = $6

    RETURNING *
  `;

  const result = await pool.query(
    query,
    [
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      id
    ]
  );

  return result.rows[0];
};