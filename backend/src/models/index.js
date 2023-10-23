const { findAllProducts, findProductById, insertNewProduct, deleteProduct } = require('./products');
const { findAllSales, findSalesById, insertNewSale, createNewSale } = require('./sales');

module.exports = {
  findAllProducts,
  findProductById,
  findAllSales,
  findSalesById,
  insertNewProduct,
  insertNewSale,
  createNewSale,
  deleteProduct,
};