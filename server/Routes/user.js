import express from "express";
 
import {update,
    deleteuser,
    getuser,
    subscribe,
    unsubscribe,
    like,
    dislike,
} from "../controller/user.js"
import  {verifytoken}  from "../verifytoken.js";


const router = express.Router();

router.put("/:id",verifytoken,update);


router.delete("/:id",verifytoken,deleteuser);

router.get("/find/:id",getuser);



router.put("/sub/:id", verifytoken, subscribe);
router.put("/unsub/:id", verifytoken, unsubscribe);

router.put("/like/:videoid",verifytoken,like);
router.put("/dislike/:videoid",verifytoken,dislike);



export default router;

