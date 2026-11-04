const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function protect(req, res, next) {
  const header = req.get("authorization") || "";
  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication token required" });
  }
  const token = header.slice(7).trim();
  if (!token) return res.status(401).json({ message: "Authentication token required" });

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
      issuer: "eventhub-api",
      audience: "eventhub-client",
    });
  } catch (_error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const user = await User.findById(payload.sub);
  if (!user) return res.status(401).json({ message: "User account not found" });
  req.user = user;
  return next();
}

function adminOnly(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "Authentication required" });
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  return next();
}

module.exports = { protect, adminOnly };
