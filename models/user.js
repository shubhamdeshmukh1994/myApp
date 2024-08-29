const db = require("../config/db");

class User {
  static async createUser(user_name, email, password, is_admin = false, phone, createdBy) {
    try {
      const [result] = await db.execute(
        "INSERT INTO users (user_name, email, password, is_admin, phone, created_by) VALUES (?, ?, ?, ?, ?, ?)",
        [user_name, email, password, is_admin, phone, createdBy]
      );
      return result?.insertId;
    } catch (error) {
      console.error("error while createUser", error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.execute("SELECT * FROM users WHERE email = ? and isactive = true", [
        email,
      ]);
      return rows[0];
    } catch (error) {
      console.error("error while findByEmail", error);
      throw error;
    }
  }

  static async findAdmin() {
    try {
      const [rows] = await db.execute("SELECT * FROM users WHERE is_admin = true and isactive = true");
      return rows[0];
    } catch (error) {
      console.error("error while findByEmail", error);
      throw error;
    }
  }

  static async findById({ userId }) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM users WHERE user_uid = ?",
        [userId]
      );
      return rows[0];
    } catch (error) {
      console.error("error while fetching user by uid", error);
      throw error;
    }
  }

  static async updateUser(userId, updates, updatedBy) {
    try {
      const fields = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(updates);
    values.push(updatedBy)
      values.push(userId);

      const [result] = await db.execute(
        `UPDATE users SET ${fields}, updated_by = ? WHERE user_uid = ?`,
        values
      );
      return result?.affectedRows;
    } catch (error) {
      console.error("error while updating user", error);
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      const [result] = await db.execute(
        "DELETE FROM users WHERE user_uid = ?",
        [userId]
      );
      return result?.affectedRows;
    } catch (error) {
      console.error("error while deleting user", error);
      throw error;
    }
  }
}

module.exports = User;
