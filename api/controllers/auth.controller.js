import express from 'express'
import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) {
      return next(errorHandler(401, 'User not found'))//here i make a own err so i can call error middleware
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password)


    if (!validPassword) {
      return next(errorHandler(401, 'Invalid password'))//here i make a own err so i can call error middleware ,errorHandler( 401,'Invalid password') this will return a err object
    }
    const { password: pass, ...rest } = validUser._doc
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SCRETE)

    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
  }
  catch (err) {
    next(err)
  }
}

export const google = async (req, res, next) => {
  try {

    const user = await User.findOne({ email: req.body.email })

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SCRETE)
      const { password, ...rest } = user._doc
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
    }
    else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
        , email: req.body.email, avatar: req.body.photo, password: hashedPassword


      })
      await newUser.save()

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SCRETE)
      const { password, ...rest } = newUser._doc
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
    }
  } catch (err) {
    next(err)
  }
}

export const signout = async (req,res,next) => {

  try {
    res.clearCookie('access_token')
    res.status(200).json("signout Successfully")
  } catch (err) {
    next(err)
  }

}