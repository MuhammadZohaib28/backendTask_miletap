// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");
const config = require("../config");

const secretKey = config.JWT_SECRET;

function generateToken(user) {

  const payload = {
    userId: user.id,
    email: user.email
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}

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

    // const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    // console.log(isPasswordValid, hashedPassword)

    // Create new user
    const userCreated = await User.create(email, password);
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

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(password, user.password, hashedPassword, isPasswordValid, "isPasswordValid")
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

//  $2b$10$wfFumCspbZXfDPI2LEs1u.sbS6gAcJa5DEZs1SEWPl6iBPWvsq.b6

// '$2b$10$15lMJ4Q42aJnIigSbldDR.MMXGf0oPYb7MsdnCpugxg4apEUMUc.2