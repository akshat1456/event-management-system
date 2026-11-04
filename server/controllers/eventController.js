const mongoose = require("mongoose");
const Event = require("../models/Event");

const fields = ["title", "description", "date", "location", "category"];
const limits = { title: 120, description: 1000, date: 80, location: 120, category: 80 };

function validateEvent(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Request body must be a JSON object" };
  }

  const cleaned = {};
  for (const field of fields) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return { error: `${field} is required and must be a non-empty string` };
    }
    cleaned[field] = body[field].trim();
    if (cleaned[field].length > limits[field]) {
      return { error: `${field} must contain no more than ${limits[field]} characters` };
    }
  }
  return { data: cleaned };
}

function validId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id) && mongoose.isValidObjectId(id);
}

async function getAllEvents(req, res) {
  const events = await Event.find().sort({ _id: -1 });
  return res.status(200).json(events);
}

async function getEventById(req, res) {
  if (!validId(req.params.id)) {
    return res.status(400).json({ message: "Invalid MongoDB event ID" });
  }

  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  return res.status(200).json(event);
}

async function createEvent(req, res) {
  const { data, error } = validateEvent(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const event = await Event.create(data);
  return res.status(201).json(event);
}

async function updateEvent(req, res) {
  if (!validId(req.params.id)) {
    return res.status(400).json({ message: "Invalid MongoDB event ID" });
  }

  const { data, error } = validateEvent(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const event = await Event.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  return res.status(200).json(event);
}

async function deleteEvent(req, res) {
  if (!validId(req.params.id)) {
    return res.status(400).json({ message: "Invalid MongoDB event ID" });
  }

  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  return res.status(200).json({ message: "Event deleted successfully", event });
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
