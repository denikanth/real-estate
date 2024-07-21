import Listing from "../model/listing.model.js"
import { errorHandler } from "../utils/error.js"

export const createListing=async(req,res,next)=>{

    try {
        
        const Listings=await Listing.create(req.body)
        
        res.status(201).json(Listings)
    } catch (err) {
        next(err)
    }
}

export const deleteListing=async(req,res,next)=>{
    const data=await Listing.findById(req.params.id)
    const userRef=data.userRef

    
    if(req.user.id !== userRef) return next(errorHandler(401,'You can only delete your listing'))
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("listing has been deleted")
        console.log(req.params.id);
    } catch (err) {
        next(err)

    }
}
