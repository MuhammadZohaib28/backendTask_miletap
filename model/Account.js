// models/Account.js
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    birthday: String,
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
