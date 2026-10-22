const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: JSON body parsing and cross-origin requests for local development.
app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "EventHub API is running" });
});

app.use("/api/events", eventRoutes);

// Any route not handled above returns a JSON 404.
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Error-handling middleware (four parameters are required by Express).
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON request body" });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({ message: "Request body is too large" });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`EventHub API running at http://localhost:${PORT}`);
});
