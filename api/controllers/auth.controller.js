import express from 'express'
import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
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