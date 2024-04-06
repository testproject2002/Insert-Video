import  express  from "express";
const router = express.Router();
import  { addVideo, addView, deleteVideo, getBytag, getVideo, random, search, sub,  trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

router.post("/",verifyToken,addVideo)

router.put("/:id",verifyToken,updateVideo)

router.delete("/:id",verifyToken,deleteVideo)

router.get("/find/:id",getVideo)

router.put("/view/:id",addView)

router.get("/trend",trend)

router.get("/random",random)

router.get("/sub",verifyToken,sub)

router.get("/tags",getBytag)

router.get("/search",search)

export default router;