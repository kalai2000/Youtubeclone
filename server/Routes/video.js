import express from "express";
const router = express.Router();

import {
  addVideo,
  updateVideo,
  deleteVideo,
  addView,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
  getVideosByChannel,
  getVideosByUser,
} from "../controller/video.js";

import { verifytoken } from "../verifytoken.js";
import upload from "../middleware/multer.js";

//   STATIC ROUTES FIRST
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifytoken, sub);
router.get("/tags", getByTag);
router.get("/search", search);

//   DYNAMIC ROUTES LAST  
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);

//   FETCH VIDEOS BY CHANNEL
router.get("/byChannel/:channelId", getVideosByChannel);

//   FETCH VIDEOS BY LOGGED-IN USER
router.get("/byUser", verifytoken, getVideosByUser);



//  Upload with file handling
router.post(
  "/",
  verifytoken,
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addVideo
);

router.put("/:id", verifytoken, updateVideo);
router.delete("/:id", verifytoken, deleteVideo);

export default router;
