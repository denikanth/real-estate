import Listing from "../model/listing.model.js"
import { errorHandler } from "../utils/error.js"
import mongoose from "mongoose"
export const createListing = async (req, res, next) => {

    try {

        const Listings = await Listing.create(req.body)

        res.status(201).json(Listings)
    } catch (err) {
        next(err)
    }
}

export const deleteListing = async (req, res, next) => {
    const data = await Listing.findById(req.params.id)
    const userRef = data.userRef


    if (req.user.id !== userRef) return next(errorHandler(401, 'You can only delete your listing'))
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("listing has been deleted")

    } catch (err) {
        next(err)

    }
}
export const updateListing = async (req, res, next) => {
    //checking if the id is in correct id format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(errorHandler(400, "ID is invalid"));
    }

    const listing = await Listing.findById(req.params.id)

    if (!listing) return next(errorHandler(404, "Listing not found"))
    if (req.user.id !== listing.userRef) return next(errorHandler(401, "You can only update your account"))

    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id,
            req.body,
            { new: true }//this return the new updated listing not the previous listing
        )

        res.status(200).json(updatedListing)
    } catch (err) {
        next(err)
    }
}

export const getListing = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(errorHandler(400, "ID is invalid"));
    }

    const listing = await Listing.findById(req.params.id)

    if (!listing) return next(errorHandler(404, "Listing not found"))
    //if (req.user.id !== listing.userRef) return next(errorHandler(401, "You can only get your Listing"))

    try {
        res.status(200).json(listing)
    } catch (err) {
        next(err)
    }

}
export const getListings = async (req, res, next) => {

    try {
        
        const limit = parseInt(req.query.limit) || 9
        const startIndex = parseInt(req.query.startIndex) || 0
        const searchTerm = req.query.searchTerm || ''
        const sort = req.query.sort || 'createdAt'
        const order = req.query.order || 'desc'
        let offer = req.query.offer
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] }//this $in operator is used to match whether offer value in in the array[false,true]
            //so in the database it will take both offer:true and offer:false documents
        }
        let parking = req.query.parking
        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] }
        }
        let furnished = req.query.furnished
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] }
        }
        let type = req.query.type
        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] }
        }
        //$regex operator do if my input eg:de but the database contain name:deni eventhough it is not fully match the regex will take the doument if my input is presnet in the name field value
        //$options:'i' just dont care about case sensitive it return the document eventhough it is case sesitive
        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            parking,
            furnished,
            type,
        }).sort(
            { [sort]: order }
        ).limit(limit).skip(startIndex)
        //skip() is used to ignore specifed number of documents in this case it is 0 means it wont skip any documents
        res.status(200).json(listings)
        console.log(listings);
    } catch (err) {
        next(err)
    }
}