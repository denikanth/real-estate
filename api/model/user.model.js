import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s"
    }
}, { timestamps: true })

const User = new mongoose.model('User', userSchema)//i created a model or collection called User using that userSchema 
//note that mongoDb automatically add s after User collection if if we add more documents in it
export default User