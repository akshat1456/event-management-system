// Trusted local-only script. No public HTTP endpoint can create an administrator.
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    throw new Error('Usage: node scripts/makeAdmin.js "registered-email@example.com"');
  }
  await connectDB();
  const result = await User.findOneAndUpdate({ email }, { $set: { role: "admin" } }, { new: true });
  if (!result) throw new Error("User not found. Register this email first, then rerun.");
  console.log(`Admin role enabled for ${result.email}. This action was performed locally.`);
}

main().catch(err => { console.error(err.message); process.exitCode = 1; })
  .finally(async () => { await mongoose.disconnect(); });
