const mongoose = require("mongoose");

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing. Create and configure server/.env.");
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("MongoDB Atlas connected successfully");
}

module.exports = connectDB;
