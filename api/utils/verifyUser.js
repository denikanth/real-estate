import { errorHandler } from "./error.js"
import jwt from 'jsonwebtoken'
import express from 'express'
const app=express()
export const verfiyToken=(req,res,next)=>{
        const token=req.cookies.access_token
        if(!token) return next(errorHandler(401,"your not not authenticated"))

        
        jwt.verify(token,process.env.JWT_SCRETE,(err,user)=>{
            if(err) return next(errorHandler(403,'forbidden or token is not valid'))
            req.user=user
        console.log(req.user)
            next()
        })
        

}
