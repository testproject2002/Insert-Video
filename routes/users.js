import  express  from "express";
const router = express.Router();
import { verifyToken } from "../verifyToken.js";
import {update,deleteUser,getUser,subscribe,unsubscribe,like,dislike} from "../controllers/user.js";

//update user
router.put("/:id",verifyToken,update)

//delete user
router.delete("/:id",verifyToken,deleteUser)

//get a user
router.get("/find/:id",getUser)

//subscribe a user 
router.put("/sub/:id",verifyToken,subscribe)

//unsubscribe user
router.put("/unsub/:id",verifyToken,unsubscribe)

//like a user 
router.put("/like/videoId",verifyToken,like)

//dis like user
router.put("/dislike/videoId",verifyToken,dislike)


export default router;