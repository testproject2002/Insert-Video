import createError from "../error.js";
import Video from '../models/video.js'
import User from '../models/user.js'

export const addVideo = async (req,res,next)=>{
   const newVideo = new Video({userId:req.user.id, ...req.body});
   try {
    const savedVideo = await newVideo.save()
    res.status(200).json(savedVideo)
   } catch (err) {
    console.log(err)
    next(err)
   }
}

export const updateVideo = async (req,res,next)=>{
    try {
        const video =await Video.findById(req.params.id)
        if(!video) return next(createError(404,'video not found!'))
        if(req.user.id===video.userId)
        {
            const updatedUser = await Video.findByIdAndUpdate(req.params.id,
                {
                    $set:req.body
                },
                {
                    $new:true
                }
                )
                res.status(200).json(updateVideo)

        }
        else{
            return next(createError(403,'you can only upadate your video'))
        }
    } catch (err) {
        next(err)
    }
}

export const deleteVideo = async (req,res,next)=>{
    try {
        const video =await Video.findById(req.params.id)
        if(!video) return next(createError(404,'video not found!'))
        if(req.user.id===video.userId)
        {
             await Video.findByIdAndDelete(req.params.id)
                res.status(200).json('the video has been deleted successfully')
        }
        else{
            return next(createError(403,'you can delete only your video'))
        }
    } catch (err) {
        next(err)
    }
}

export const getVideo = async (req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
}

export const addView = async (req,res,next)=>{
    try {
        await Video.findByIdAndUpdate(req.params.id,
            {
                $inc:{views:1}
            })
            res.status(200).json('the viw has been increased')
    } catch (err) {
        next(err)
    }
}

export const trend = async (req,res,next)=>{
    try {
        const video = await Video.find().sort({views:-1})
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
}

export const random = async (req,res,next)=>{
    try {
        const video = await Video.aggregate([{$sample:{size:1}}])
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
}

export const sub = async (req,res,next)=>{
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers;

        const list = await  Promise.all(
            subscribedChannels.map((channelId)=>{
                console.log(channelId)
                return Video.find({userId:channelId})
                
            })
            
        )
        
        // console.log(list)
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt))
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const getBytag = async(req,res,next)=>{
    const tags = req.query.tags.split(",")
    console.log(tags)
  try {
    const video = await Video.find({tags:{ $in:tags }}).limit(20)
    console.log(video)
    res.status(200).json(video)
  } catch (err) {
    next(err)
  }
}

export const search = async(req,res,next)=>{
    const query = req.query.q;
    try {
      const video = await Video.find({title:{$regex:query, $options:"i"}}).limit(20)
      res.status(200).json(video)
    } catch (err) {
      next(err)
    }
  }
