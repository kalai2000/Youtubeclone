import express from "express";
const router = express.Router();

import {
  createChannel,
  getChannel,
  addVideoToChannel,
  uploadBanner
} from "../controller/channel.js";

import { verifytoken } from "../verifytoken.js";
import upload from "../middleware/multer.js";

// Channel routes
router.post("/", verifytoken, createChannel); // Create a channel
router.get("/:channelId", getChannel); // Get a channel by ID
router.post("/:channelId/addVideo", verifytoken, addVideoToChannel); // Add a video
router.post("/uploadBanner", verifytoken, upload.single("banner"), uploadBanner); // Upload banner

export default router;
