import express from 'express'
import { test } from '../controllers/user.controller.js'
const router=express.Router()

router.get('/test',test)//these are the subroutes of api/user api route

export default router