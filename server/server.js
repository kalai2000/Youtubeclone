import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./Routes/auth.js";
import userRoutes from "./Routes/user.js";
import videoRoutes from "./Routes/video.js";
import commentRoutes from "./Routes/comments.js";
import channelRoutes from "./Routes/channel.js"

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

// Middleware
app.use(cors({ origin: "https://youtubecloneintershala.netlify.app", credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Static folder for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/channels", channelRoutes);


app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({ success: false, status, message });
});

// Start server
app.listen(8800, () => {
  connect();
  console.log("Server running on http://localhost:8800");
});


