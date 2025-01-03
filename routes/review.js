const express = require("express");
const router = express.Router({mergeParams:true});
const {listingSchema , reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");

const ReviewController = require("../controller/reviews.js");



const validateReview = (req , res , next)=>{
    let {error} = reviewSchema.validate(req.body);

    if(error){
        let  errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else{
        next();
    }
}



router.post("/" , validateReview , ReviewController.creatReview);

router.delete("/:reviewsId" , ReviewController.destroyReview);

module.exports = router;
