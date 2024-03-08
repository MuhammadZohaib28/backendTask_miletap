// models/User.js
const db = require("../db/db.js");
const bcrypt = require("bcrypt");

const User = {
  async create(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.run("INSERT INTO User (email, password) VALUES (?, ?)", [
        email,
        hashedPassword,
      ]);
      return true;
    } catch (error) {
      console.error("Error creating user:", error);
      return false;
    }
  },

  async findByEmail(email) {
    const response = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM User WHERE email = ?", [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    console.log(response, "RES: ")
    return response
  },
};

module.exports = User;
