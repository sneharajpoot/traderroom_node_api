// authMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware function to verify JWT
const verifyToken = (req, res, next) => {
  let token = req.header("Authorization") || req.header("authorization"); // Get token from header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    token = token.split(" ")[1];

    const SECERET_KEY = process.env.SECERET_KEY;

    // Verify the token
    const decoded = jwt.verify(token, SECERET_KEY); // Replace 'yourSecretKey' with your secret or private key
    req.user = decoded; // Add the decoded user data to the request object
    next(); // Call next() to pass control to the next middleware
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = {verifyToken};
