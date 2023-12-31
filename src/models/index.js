const { findAllProducts, findProductById, insertNewProduct,
  deleteProduct, updateProduct, seachProductByName } = require('./products');
const { findAllSales, findSalesById, insertNewSale, createNewSale,
  deleteSale, updateSale } = require('./sales');

module.exports = {
  findAllProducts,
  findProductById,
  findAllSales,
  findSalesById,
  insertNewProduct,
  insertNewSale,
  createNewSale,
  deleteProduct,
  updateProduct,
  deleteSale,
  updateSale,
  seachProductByName,
};