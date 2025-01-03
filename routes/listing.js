const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const path = require("path");
const {listingSchema , reviewSchema} = require("../schema.js");
const flash = require("connect-flash/lib/flash.js");
const {isLogedIn} = require("../middleware.js");
const ListingControler = require("../controller/listing.js");


const validateLisiting = (req , res , next)=>{
    let {error} = listingSchema.validate(req.body);
  
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 ,errMsg);

    }else{
        next();
    }
}





router.get("/" ,  (ListingControler.index));
 //this get before id because it treat like a id to new

 
 
 router.get("/new" , isLogedIn , ListingControler.renderNewform);

 router.get("/:id" , ListingControler.showListings);
 
 
 
 router.post("/" , validateLisiting,  wrapAsync(ListingControler.creatListings));
 
 router.get("/:id/edit", isLogedIn, ListingControler.rederEditForm);
  
 router.put("/:id" , validateLisiting , ListingControler.updateListing);
 
 router.delete("/:id" , isLogedIn,  ListingControler.destroyListing);

 module.exports = router;
 