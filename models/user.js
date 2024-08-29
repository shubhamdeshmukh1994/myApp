const db = require("../config/db");

class User {
  static async createUser(user_name, email, password, is_admin = false, phone) {
    try {
      const [result] = await db.execute(
        "INSERT INTO users (user_name, email, password, is_admin, phone) VALUES (?, ?, ?, ?, ?)",
        [user_name, email, password, is_admin, phone]
      );
      return result?.insertId;
    } catch (error) {
      console.error("error while createUser", error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
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

  static async updateUser(userId, updates) {
    try {
      const fields = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(updates);
      values.push(userId);

      const [result] = await db.execute(
        `UPDATE users SET ${fields} WHERE user_uid = ?`,
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
