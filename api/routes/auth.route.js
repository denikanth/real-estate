import express, { Router } from 'express'
import { signin, signup } from '../controllers/auth.controller.js'
const app=express()
const auth=express.Router()

auth.post('/signup',signup)
auth.post('/signin',signin)

export default auth