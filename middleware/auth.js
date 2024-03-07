// authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");
const config = require("../config");

const authMiddleware = async (req, res, next) => {
  // Check if the request headers contains authorization key
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  // Grab the token from headers (taking the "Bearer" string only)
  const token = authorization.split(" ")[1];

  try {
    // Decode and extract the user id from the token
    const { userId } = jwt.verify(token, config.JWT_SECRET);

    // save the user in request
    req.user = await User.findById(userId).select("_id");

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = authMiddleware;
