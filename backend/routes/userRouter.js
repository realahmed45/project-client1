const express = require("express");
const {
  register,
  login,
  logout,
  userProfile,
  checkAuth,
} = require("../contollers/usersController");
const isAuthenticated = require("../MIDDLEWARE/isAuthenticated");
const User = require("../models/User"); // Import User model

const ServiceRequest = require("../models/ServicesRequest"); // Import ServiceRequest model

const usersRouter = express.Router();

// Endpoint to handle service requests
usersRouter.post("/service-request", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, service, description } = req.body;

    // Create a new instance of ServiceRequest model
    const serviceRequest = new ServiceRequest({
      fullName,
      email,
      phoneNumber,
      service,
      description,
    });

    // Save the service request to the database
    await serviceRequest.save();

    // Send success response
    res.status(201).json({ message: "Service request submitted successfully" });
  } catch (error) {
    console.error("Error submitting service request:", error);
    res.status(500).json({
      message: "Failed to submit service request",
      error: error.message,
    });
  }
});

// Register route
usersRouter.post("/register", register);

// Login route
usersRouter.post("/login", login);

// Logout route
usersRouter.post("/logout", logout);

// User profile route (protected by isAuthenticated middleware)
usersRouter.get("/profile", isAuthenticated, async (req, res) => {
  try {
    // Assuming userId is available in req.user.id after authentication
    const userId = req.user.id;

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user profile with populated contentHistory
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Check authentication route (protected by isAuthenticated middleware)
usersRouter.get("/auth/check", isAuthenticated, checkAuth);

module.exports = usersRouter;
