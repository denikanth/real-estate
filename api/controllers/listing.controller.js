import Listing from "../model/listing.model.js"

export const createListing=async(req,res,next)=>{

    try {
        
        const Listings=await Listing.create(req.body)
        
        res.status(201).json(Listings)
    } catch (err) {
        next(err)
    }
}