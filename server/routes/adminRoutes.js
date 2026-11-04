const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect, adminOnly);
router.get("/overview", async (req, res) => {
  const [users, events] = await Promise.all([User.countDocuments(), Event.countDocuments()]);
  return res.status(200).json({
    message: "Admin access granted",
    admin: { name: req.user.name, email: req.user.email, role: req.user.role },
    totalUsers: users,
    totalEvents: events,
  });
});
module.exports = router;
