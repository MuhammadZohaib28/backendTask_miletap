const sqlite3 = require("sqlite3").verbose();
const config = require("../config");
const db = new sqlite3.Database(config.DATABASE_PATH);

// Create User table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
});

module.exports = db;
