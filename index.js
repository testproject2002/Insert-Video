import express from "express"
import mongoose from "mongoose"
import doteenv from 'dotenv'
import userRoute from './routes/users.js'
import videoRoute from './routes/videos.js'
import commentRoute from './routes/comments.js'
import authRoute from './routes/auths.js'
import cookieParser from "cookie-parser"
doteenv.config()
const app = express()
const PORT = 8000

const mongoConnection = async ()=>{
    try {
        const connectInstance = await mongoose.connect('mongodb://localhost:27017/youtube');
        console.log(`connected to mongoDb`)
    } catch (error) {
     
   console.log(`mongoDb not connected ${error}`)
    }
}
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/videos',videoRoute)
app.use('/api/comment',commentRoute)
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || 'something went wrong';
    return res.status(status).json({
        success:false,
        status,
        message
    })
})




app.listen(PORT,()=>{
    mongoConnection()
    console.log(`server connected to port : ${PORT}`)
})