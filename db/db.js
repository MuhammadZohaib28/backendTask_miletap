// db.js
const sqlite3 = require("sqlite3").verbose();
const config = require("../config.js");

const db = new sqlite3.Database(config.DATABASE_PATH, (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create User and Account tables if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Account (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT,
      email TEXT UNIQUE,
      phone TEXT,
      password TEXT,
      birthday TEXT
    )
  `);
});

module.exports = db;
