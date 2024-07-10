const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config(); // Ensure environment variables are loaded

//----IsAuthenticated middleware
const isAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    console.log("Request Cookies:", req.cookies); // Log request cookies

    // Check if token exists in cookies
    if (!req.cookies || !req.cookies.token) {
      console.log("No token found in cookies");
      throw new Error("Token not found in cookies");
    }

    // Verify the token
    console.log("Verifying token...");
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log decoded token

    // Add the user to the req object
    console.log("Finding user by ID:", decoded.id);
    req.user = await User.findById(decoded.id).select("-password");
    console.log("Found User:", req.user); // Log found user

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Handle errors
    console.error("Authentication Error:", error.message);
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

module.exports = isAuthenticated;
