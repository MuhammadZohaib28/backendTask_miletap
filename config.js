// config.js
module.exports = {
  DATABASE_PATH: process.env.DATABASE_PATH || "./database.db",
  JWT_SECRET: process.env.JWT_SECRET || "mysecretkey",
};
