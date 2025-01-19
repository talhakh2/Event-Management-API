const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware.js");
const { getUserById, updateUser } = require("../controllers/userController");

const router = express.Router();

router.route("/:id")
  .get(protect, authorize("admin", "user"), getUserById)
  .put(protect, authorize("admin", "user"), updateUser);

module.exports = router;