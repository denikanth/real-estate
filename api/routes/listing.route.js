import express from 'express'
import { verfiyToken } from '../utils/verifyUser.js'
import { createListing, deleteListing, getListing, getListings, updateListing } from '../controllers/listing.controller.js'
const router=express.Router()

router.post('/create',verfiyToken,createListing)
router.delete('/delete/:id',verfiyToken,deleteListing)
router.post('/update/:id',verfiyToken,updateListing)
router.get('/get-listing/:id',verfiyToken,getListing)
router.get('/get',getListings)


export default router