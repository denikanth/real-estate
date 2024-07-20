import express from 'express'
import { verfiyToken } from '../utils/verifyUser.js'
import { createListing } from '../controllers/listing.controller.js'
const router=express.Router()

router.post('/create',verfiyToken,createListing)


export default router