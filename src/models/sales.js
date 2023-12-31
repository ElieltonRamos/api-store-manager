const connection = require('./connection');

const findAllSales = async () => {
  const [allSales] = await connection.execute(`
  SELECT
  t1.sale_id AS saleId,
  t3.date,
  t2.id AS productId,
  t1.quantity
FROM sales_products AS t1
  INNER JOIN products AS t2 ON t1.product_id = t2.id
  INNER JOIN sales AS t3 ON t1.sale_id = t3.id
  ORDER BY t1.sale_id, t2.id;`);
  return allSales;
};

const findSalesById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT
  t3.date,
  t2.id AS productId,
  t1.quantity
FROM sales_products AS t1
  INNER JOIN products AS t2 ON t1.product_id = t2.id
  INNER JOIN sales AS t3 ON t1.sale_id = t3.id
  WHERE sale_id = ?;`,
    [id],
  );
  return sale;
};

const createNewSale = async () => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (NOW())');
  return insertId;
};

const insertNewSale = async (data) => {
  const placeholders = data.map((_) => '(?, ?, ?)').join(', ');
  const idSale = await createNewSale();
  if (!idSale) return { message: 'error' };
  const values = data.map(({ productId, quantity }) => [idSale, productId, quantity]).flat();
  const responseDB = await connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ${placeholders};`,
    [...values],
  );
  if (responseDB[0].affectedRows === 0) return { message: 'error' };
  return { id: idSale, itemsSold: data };
};

const deleteSale = async (id) => {
  const [deletedSale] = await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return deletedSale.affectedRows;
};

const updateSale = async (saleId, productId, newQuantity) => {
  const [updatedSale] = await connection.execute(`
  UPDATE sales_products
  SET quantity = ?
  WHERE sale_id = ?
  AND product_id = ?`, [newQuantity, saleId, productId]);
  return updatedSale.affectedRows;
};

module.exports = {
  findAllSales,
  findSalesById,
  insertNewSale,
  createNewSale,
  deleteSale,
  updateSale,
};