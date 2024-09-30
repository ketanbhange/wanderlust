const express = require("express");
const router = express.Router({mergeParams:true});
const {listingSchema , reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");



const validateReview = (req , res , next)=>{
    let {error} = reviewSchema.validate(req.body);

    if(error){
        let  errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else{
        next();
    }
}



router.post("/" , validateReview , async (req , res)=>{
       let listing = await Listing.findById(req.params.id);
       let newReview = new Review(req.body.review);
       listing.reviews.push(newReview);

       await newReview.save();
       await listing.save();

       console.log(newReview);
       res.redirect(`/listing/${listing._id}`);
})

router.delete("/:reviewsId" , async (req ,res)=>{
    let {id , reviewsId}= req.params;

    //remove also listings reviews array
    await Listing.findByIdAndUpdate(id , {$pull: {reviews:reviewsId}});

    await Review.findByIdAndDelete(reviewsId);
    res.redirect(`/listing/${id}`);
})

module.exports = router;
