import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
export const test = (req, res) => {
    res.json({
        message: "api route is working"
    })
}//this is the controller of user/test route api

export const updateUser = async (req, res, next) => {
    //req.params.id is the data of whome i want to change the information in this case thats me
    if (req.user.id !== req.params.id) return next(errorHandler(403, 'you can only allowed to update your account'))

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                password:req.body.password,
                email:req.body.email,
                avatar:req.body.avatar,
            }//set operator just used to define the update value in it
        },{new:true})//{new:true} is responsible for update this updated document in mongoDb database collectins
       
        const {password,...rest}=updatedUser._doc
        res.status(200).json(rest)
        
    } catch (err) {
        next(err)
    }
} 

export const deleteUser=async(req,res,next)=>{
    if (req.user.id !== req.params.id) return next(errorHandler(403, 'you can only allowed to delete your account'))

        try {
            await User.findByIdAndDelete(req.params.id)
            res.clearCookie('access_token')
            res.status(200).json("user has been deleted")
            
        } catch (err) {
            next(err)
        }
}

export const showListing=async(req,res,next)=>{
    
    if(req.params.id !== req.user.id) return next(errorHandler(401,"you can only view your listing"))
    try {
        const listings=await Listing.find({userRef:req.user.id})
        
        res.status(200).json(listings)
    } catch (err) {
        next(err)
    }

    
}

export const getUser=async(req,res,next)=>{

    try {
        const user =await User.findById(req.params.id)
        if(!user) return next(errorHandler(401,'user not found'))
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}