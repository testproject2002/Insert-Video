import  express  from "express";
import { verifyToken } from "../verifyToken.js";
import { addComment, deleteComment, getComment } from "../controllers/comment.js";
const router = express.Router();

router.post('/',verifyToken,addComment)
router.delete('/',verifyToken,deleteComment)
router.post('/',verifyToken,getComment)




export default router;