import jwt from 'jsonwebtoken'
import createError from '../server/error.js'

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token) return next(createError(401,'you are not aunthenticated!'))

    jwt.verify(token,'secretekey',(err,user)=>{
        if(err) return next(createError(403,'token is not valid'))
        req.user = user;
    next()
    })
}