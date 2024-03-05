// config.js
module.exports = {
  mongoURI:
    process.env.MONGO_URI ||
    "mongodb+srv://crudapi:crudapi@cluster0.ranrz7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  jwtSecret: process.env.JWT_SECRET || "mysecretkey",
};
