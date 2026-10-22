// In-memory sample data for Experiment 4 (resets on server restart).
let events = [
  {
    id: 1,
    title: "Tech Fest 2026",
    description: "A technology event for students.",
    date: "20 September 2026",
    location: "Mumbai",
    category: "Technology",
  },
  {
    id: 2,
    title: "React Workshop",
    description: "Learn React from basics to advanced.",
    date: "25 September 2026",
    location: "Pune",
    category: "Workshop",
  },
  {
    id: 3,
    title: "AI Conference",
    description: "Explore the latest developments in AI.",
    date: "30 September 2026",
    location: "Bangalore",
    category: "Conference",
  },
];

let nextId = 4;
const requiredFields = ["title", "description", "date", "location", "category"];

function parseEventId(value) {
  if (!/^[1-9]\d*$/.test(value)) return null;

  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}

function validateEvent(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Request body must be a JSON object" };
  }

  const data = {};
  for (const field of requiredFields) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return { error: `${field} is required and must be a non-empty string` };
    }
    data[field] = body[field].trim();
  }

  return { data };
}

function getAllEvents(req, res) {
  return res.status(200).json(events);
}

function getEventById(req, res) {
  const id = parseEventId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  const event = events.find((item) => item.id === id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  return res.status(200).json(event);
}

function createEvent(req, res) {
  const { data, error } = validateEvent(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const newEvent = { id: nextId++, ...data };
  events.push(newEvent);
  return res.status(201).json(newEvent);
}

function updateEvent(req, res) {
  const id = parseEventId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  const index = events.findIndex((event) => event.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const { data, error } = validateEvent(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const updatedEvent = { id, ...data };
  events[index] = updatedEvent;
  return res.status(200).json(updatedEvent);
}

function deleteEvent(req, res) {
  const id = parseEventId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  const index = events.findIndex((event) => event.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const [deletedEvent] = events.splice(index, 1);
  return res.status(200).json({
    message: "Event deleted successfully",
    event: deletedEvent,
  });
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
