// config.js
module.exports = {
  DATABASE_PATH: process.env.DATABASE_PATH || "./database.db",
  jwtSecret: process.env.JWT_SECRET || "mysecretkey",
};
