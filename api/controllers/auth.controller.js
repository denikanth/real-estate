import express from 'express'
import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
export const signup = async (req, res) => {
    const { username, email, password } = req.body
    const hashPassword = bcryptjs.hashSync(password, 10)
    const newUser = await new User({
        username, email, password: hashPassword
    })
    try {
        await newUser.save()
        res.status(201).json("user created successfully")
    } catch (err) {
        res.status(500).json(err.message)

    }

}