import express from "express";
import multer from "multer";
import path from "path";
import { verifytoken } from "../verifytoken.js";
import { addVideo } from "../controller/video.js";

const router = express.Router();

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // directory to store uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

//   Multer is applied as middleware here
router.post("/video", verifytoken, upload.fields([{ name: "video" }, { name: "img" }]), addVideo);

export default router;
