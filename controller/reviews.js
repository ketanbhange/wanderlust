const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
module.exports.creatReview =  async (req , res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log(newReview);
    res.redirect(`/listing/${listing._id}`);
}

module.exports.destroyReview = async (req ,res)=>{
    let {id , reviewsId}= req.params;

    //remove also listings reviews array
    await Listing.findByIdAndUpdate(id , {$pull: {reviews:reviewsId}});

    await Review.findByIdAndDelete(reviewsId);
    res.redirect(`/listing/${id}`);
}
