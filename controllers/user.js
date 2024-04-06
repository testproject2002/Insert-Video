import createError from "../error.js"
import User from '../models/user.js'

export const update = async (req,res,next)=>{
    if(req.params.id === req.user.id)
    {
      try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set:req.body,
            },
            {new:true}
            
            )

        res.status(200).json(updatedUser)
      } catch (err) {
        next(err)
      }
    }
    else{
        return next(createError(403,'you can only update your account'))
    }

}
export const deleteUser = async (req,res,next)=>{
    if(req.params.id === req.user.id)
    {
      try {
        const updatedUser = await User.findByIdAndDelete(req.params.id,)

        res.status(200).json('user has been deleted.')
      } catch (err) {
        next(err)
      }
    }
    else{
        return next(createError(403,'you can only update your account'))
    }
}
export const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}
export const subscribe = async (req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $push:{ subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
         $inc:{
            subscriber:1}
        })
        res.status(200).json("subscription successfull")
    } catch (err) {
        console.log(err)
        next(err)
    }
    
}
export const unsubscribe = async (req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{ subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscriber: -1},
        })
        res.status(200).json("unsubscription successfull")
    } catch (err) {
        next(err)
    }
}

export const like = async (req,res,next)=>{
    try {
        
    } catch (err) {
        
    }
}

export const dislike = (req,res,next)=>{
    
}