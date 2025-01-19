const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware.js");
const { getAllUsers, getAllEventsWithStats, deleteUser } = require("../controllers/adminController");


const router = express.Router();

router.route("/users")
  .get(protect, authorize("admin"), getAllUsers);

router.route("/events")
    .get(protect, authorize("admin"), getAllEventsWithStats);

router.route("/users/:id")
  .delete(protect, authorize("admin"), deleteUser);

module.exports = router;