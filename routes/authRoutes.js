// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");
const config = require("../config");

//******************************************* */ User Registration Endpoint *******************************************//
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password - Here the password is hashed using bcrypt.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const userCreated = await User.create(email, hashedPassword);
    if (!userCreated) {
      return res.status(500).json({ error: "Failed to register user" });
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//*************************************************User Login Endpoint ***********************************************//
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials - Maybe User Doesn't exist" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials - Password" });
    }

    // If user is found and password is valid, return success message along with token
    return res.json({ message: "Login successful", token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
