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
}, { timestamps: true })

const User = new mongoose.model('User', userSchema)//i created a model or collection called User using that userSchema 
//note that mongoDb automatically add s after User collection if if we add more documents in it
export default User