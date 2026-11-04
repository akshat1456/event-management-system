const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function publicUser(user) {
  return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
}

function issueToken(user) {
  return jwt.sign({}, process.env.JWT_SECRET, {
    subject: user._id.toString(),
    algorithm: "HS256",
    issuer: "eventhub-api",
    audience: "eventhub-client",
    expiresIn: process.env.JWT_EXPIRES_IN || "2h",
  });
}

async function register(req, res) {
  const { name, email, password } = req.body || {};
  if (typeof name !== "string" || !name.trim() || name.trim().length > 80 ||
      typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof password !== "string" || password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72) {
    return res.status(400).json({ message: "Provide a name, valid email and password of at least 8 characters (max 72 bytes)" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (await User.exists({ email: normalizedEmail })) {
    return res.status(409).json({ message: "Email is already registered" });
  }
  const passwordHash = await bcrypt.hash(password, 12);
  let user;
  try {
    // Do not accept role from the request; every public signup is a normal user.
    user = await User.create({ name: name.trim(), email: normalizedEmail, password: passwordHash });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Email is already registered" });
    throw err;
  }
  return res.status(201).json({ message: "User registered successfully", user: publicUser(user) });
}

async function login(req, res) {
  const { email, password } = req.body || {};
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Email and password required" });
  }
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
  const goodPassword = user && await bcrypt.compare(password, user.password);
  if (!goodPassword) return res.status(401).json({ message: "Invalid email or password" });

  return res.status(200).json({
    message: "Login successful",
    token: issueToken(user),
    user: publicUser(user),
  });
}

async function me(req, res) {
  return res.status(200).json({ user: publicUser(req.user) });
}

module.exports = { register, login, me };
