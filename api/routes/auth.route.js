import express, { Router } from 'express'
import { google, signin, signout, signup } from '../controllers/auth.controller.js'
const app=express()
const auth=express.Router()

auth.post('/signup',signup)
auth.post('/signin',signin)
auth.post('/google',google)
auth.get('/signout',signout)

export default auth