import  express  from "express";
const router = express.Router();
import { signupController, signinController } from '../controllers/auth.js';



//Create a user 
router.post('/signup',signupController)
//Sign in 
router.post('/signin',signinController)
//Google authe
router.post('/google')

export default router;