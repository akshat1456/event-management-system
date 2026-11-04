require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors()); // Local practical only. Configure restricted origins for production.
app.use(express.json({ limit: "10kb" }));

app.get("/", (_req, res) => res.status(200).json({ message: "EventHub API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database temporarily unavailable" });
  }
  next();
}, eventRoutes);

app.use((_req, res) => res.status(404).json({ message: "API endpoint not found" }));
app.use((err, _req, res, _next) => {
  if (err.type === "entity.parse.failed") return res.status(400).json({ message: "Invalid JSON request body" });
  if (err.type === "entity.too.large") return res.status(413).json({ message: "Request body is too large" });
  if (err instanceof mongoose.Error.ValidationError) return res.status(400).json({ message: "Validation failed" });
  if (err instanceof mongoose.Error.CastError) return res.status(400).json({ message: "Invalid ID or data" });
  console.error("API request failed:", err.message);
  return res.status(500).json({ message: "Internal server error" });
});

async function startServer() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error("JWT_SECRET must be at least 32 characters. Configure server/.env.");
    process.exitCode = 1;
    return;
  }
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`EventHub API running at http://localhost:${PORT}`));
  } catch (_error) {
    console.error("MongoDB connection failed. Check server/.env and Atlas Network Access.");
    process.exitCode = 1;
  }
}
startServer();
