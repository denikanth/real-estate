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
    console.log(listing);
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
    if (req.user.id !== listing.userRef) return next(errorHandler(401, "You can only get your Listing"))

    try {
        res.status(200).json(listing)
    } catch (err) {
        next(err)
    }

}
