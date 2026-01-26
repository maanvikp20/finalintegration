const mongoose = require('mongoose');

/**
 * Connect to MongoDB database using mongoose
 * Centralizes DB steup so server.js remians clean
 */

async function connectDB(uri) {
  try {
    await mongoose.connect(uri)
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
}

module.exports = connectDB;