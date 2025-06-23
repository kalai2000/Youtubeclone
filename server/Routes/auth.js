import express from "express";
import {signup , signin} from "../controller/auth.js"
import upload from "../middleware/upload.js";
const router = express.Router()


// create a user 

router.post("/signup",upload.single("img"),signup)


// sign in
router.post("/signin",signin)




export default router;

