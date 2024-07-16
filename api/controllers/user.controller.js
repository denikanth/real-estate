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
        console.log(req.body.password)
        console.log(req.params.id)
        const {password,...rest}=updatedUser._doc
        res.status(200).json(rest)
        console.log(rest)
    } catch (err) {
        next(err)
    }
} 
