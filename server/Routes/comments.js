import express from "express";
const router = express.Router();
import { addComment, deleteComment, getComments,updateComment,
} from "../controller/comments.js";
import { verifytoken } from "../verifytoken.js";

router.post("/", verifytoken, addComment);
router.delete("/:id", verifytoken, deleteComment);
router.patch("/:id", verifytoken, updateComment);

router.get("/:videoId", getComments);

export default router;
