import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Admin } from "../models/Admin.js";

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please provide username and password" });
    }

    const envUsername = (process.env.ADMIN_USERNAME || "admin").trim();
    const envPassword = (process.env.ADMIN_PASSWORD || "admin123").trim();

    // 1. First check against environment / default credentials (instant & resilient)
    if (
      username.trim().toLowerCase() === envUsername.toLowerCase() &&
      password.trim() === envPassword
    ) {
      const token = jwt.sign(
        { id: "admin-env-id", username: envUsername },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "7d" }
      );
      return res.json({
        message: "Login successful",
        token,
        username: envUsername,
      });
    }

    // 2. Check MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const admin = await Admin.findOne({ username: username.trim() });
        if (admin) {
          const isMatch = await bcrypt.compare(password, admin.password);
          if (isMatch) {
            const token = jwt.sign(
              { id: admin._id, username: admin.username },
              process.env.JWT_SECRET || "fallback_secret",
              { expiresIn: "7d" }
            );
            return res.json({
              message: "Login successful",
              token,
              username: admin.username,
            });
          }
        }
      } catch (dbErr) {
        console.error("DB Login lookup error:", dbErr.message);
      }
    }

    return res.status(401).json({ message: "Invalid username or password" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Verify admin token
// @route   GET /api/admin/verify
// @access  Private (Admin)
export const verifyAdmin = async (req, res) => {
  res.json({ valid: true, admin: req.admin });
};

