// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const Account = require("../model/Account.js");

// Create Account
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password, birthday } =
      req.body;
    const accountData = {
      first_name,
      last_name,
      email,
      phone,
      password,
      birthday,
    };
    const accountCreated = await Account.create(accountData);
    if (accountCreated) {
      res.status(201).json({ message: "Account created successfully" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get List of Accounts
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const accounts = await Account.findAll(limit);
    res.json(accounts);
  } catch (error) {
    console.error("Error getting accounts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
