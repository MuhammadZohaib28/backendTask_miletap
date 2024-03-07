// models/Account.js
const db = require("../db/db.js");

const Account = {
  async create(accountData) {
    try {
      const { first_name, last_name, email, phone, password, birthday } =
        accountData;
      await db.run(
        "INSERT INTO Account (first_name, last_name, email, phone, password, birthday) VALUES (?, ?, ?, ?, ?, ?)",
        [first_name, last_name, email, phone, password, birthday]
      );
      return true;
    } catch (error) {
      console.error("Error creating account:", error);
      return false;
    }
  },

  async findAll(limit = 10) {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM Account LIMIT ?", [limit], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
};

module.exports = Account;
