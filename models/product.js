const db = require("../config/db");

class Product {
  static async create({ productName, description, imgUrl, price, createdBy }) {
    try {
      const [result] = await db.execute(
        "INSERT INTO products (product_name, description, img_url, price, created_by) VALUES (?, ?, ?, ?, ?)",
        [productName, description, imgUrl, price, createdBy]
      );
      return result?.insertId;
    } catch (error) {
      console.error("error while creating product", error);
      throw error;
    }
  }

  static async findAllVisible() {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM products WHERE isactive = true"
      );
      return rows;
    } catch (error) {
      console.error("error while getting product", error);
      throw error;
    }
  }

  static async findById(productId) {
    const [rows] = await db.execute(
      "SELECT * FROM products WHERE product_uid = ?",
      [productId]
    );
    return rows[0];
  }

  static async update(productId, updates, userId) {
    try {
      const fields = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(updates);
      values.push(userId);
      values.push(productId);
      const [result] = await db.execute(
        `UPDATE products SET ${fields}, updated_by = ? WHERE product_uid = ?`,
        values
      );
      return result.affectedRows;
    } catch (error) {
      console.error("error while updating product", error);
      throw error;
    }
  }

  static async deleteProduct(productId) {
    try {
      const [result] = await db.execute(
        "DELETE FROM products WHERE product_uid = ?",
        [productId]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("error while deleting product", error);
      throw error;
    }
  }
}

module.exports = Product;
