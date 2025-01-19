const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler.js");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Mount routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes); // User management routes
app.use("/api/events", eventRoutes); // Event management routes
app.use("/api/registrations", registrationRoutes); // Registration routes
app.use("/api/admin", adminRoutes); // Admin routes
app.use("/api/analytics", analyticsRoutes); // Analytics routes
app.use("/api/notifications", notificationRoutes); // Notifications routes

// Handle Errors (custom middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
