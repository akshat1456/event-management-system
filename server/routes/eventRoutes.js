const express = require("express");
const {
  getAllEvents, getEventById, createEvent, updateEvent, deleteEvent,
} = require("../controllers/eventController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", getAllEvents);
router.get("/:id", getEventById);
// Admin-only writes prepare EventHub for Experiment 7 notifications.
router.post("/", protect, adminOnly, createEvent);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);
module.exports = router;
