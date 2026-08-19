import mongoose from "mongoose";
import dns from "node:dns";

// Use Google DNS servers to resolve MongoDB SRV records reliably on Windows
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore if custom servers cannot be set
}

// Disable Mongoose buffering so queries don't hang when DB is offline/disconnected
mongoose.set("bufferCommands", false);

export const connectDB = async () => {
  try {
    // Re-enforce DNS servers right before connecting
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch (e) {}

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️ Database Connection Warning: ${error.message}`);
    console.log("ℹ️ Server running in Local Hybrid Mode with persistence.");
  }
};



