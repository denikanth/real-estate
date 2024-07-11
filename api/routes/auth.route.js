import express, { Router } from 'express'
import { signup } from '../controllers/auth.controller.js'
const app=express()
const auth=express.Router()

auth.post('/signup',signup)

export default auth