import express from 'express'
import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const signup = async (req, res,next) => {
    const { username, email, password } = req.body
    const hashPassword = bcryptjs.hashSync(password, 10)
    const newUser = await new User({
        username, email, password: hashPassword
    })
    try {
        
        await newUser.save()
        res.status(201).json("user created successfully")
    } catch (err) {
        next(err)

    }

}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body
    
    try{
      const validUser=await User.findOne({email})
      if(!validUser){
        return next(401,'User not found')
      }
      const validPassword=bcryptjs.compareSync(password,validUser.password)
      
      
      if(!validPassword){
        return next(401,'Invalid Password')
      }
      const {password:pass, ...rest}=validUser._doc
      const token=jwt.sign({id:validUser._id},process.env.JWT_SCRETE)

      res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    }
    catch(err){
        next(err)
    }
}