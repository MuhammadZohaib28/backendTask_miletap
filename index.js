// server.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const accountRoutes = require("./routes/accountRoutes.js");
const authRoutes = require("./routes/authRoutes");
const config = require("./config");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.use(bodyParser.json());

app.use("/accounts", accountRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
