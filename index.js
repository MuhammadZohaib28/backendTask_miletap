// server.js
const express = require("express");
const bodyParser = require("body-parser");
const accountRoutes = require("./routes/accountRoutes.js");
const authRoutes = require("./routes/authRoutes");
const db = require("./db/db.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use("/accounts", accountRoutes);
app.use("/auth", authRoutes);

db.on("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
