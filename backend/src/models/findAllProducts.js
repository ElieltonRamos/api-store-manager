const connection = require('./connection');

const findAllProducts = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM products');
  return allProducts;
};

module.exports = findAllProducts;