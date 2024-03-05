// routes/accountRoutes.js
const express = require("express");
const { default: Account } = require("../model/Account");
const router = express.Router();


// Create Account
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password, birthday } =
      req.body;
    const account = new Account({
      first_name,
      last_name,
      email,
      phone,
      password,
      birthday,
    });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read Account
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const accounts = await Account.find().limit(limit);
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Account
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone, password, birthday } =
      req.body;
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { first_name, last_name, email, phone, password, birthday },
      { new: true }
    );
    res.json(updatedAccount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Account
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Account.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
