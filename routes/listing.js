const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const path = require("path");
const {listingSchema , reviewSchema} = require("../schema.js");
const flash = require("connect-flash/lib/flash.js");
const {isLogedIn} = require("../middleware.js");


const validateLisiting = (req , res , next)=>{
    let {error} = listingSchema.validate(req.body);
  
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 ,errMsg);

    }else{
        next();
    }
}





router.get("/" ,  async (req , res)=>{
    let allListing =  await Listing.find({});
    res.render("listing/index.ejs" ,{allListing});
 })
 //this get before id because it treat like a id to new

 
 
 router.get("/new" , isLogedIn , (req, res)=>{
    
     res.render("listing/new.ejs");
 })

 router.get("/:id" , async(req , res)=>{
    let {id} = req.params;
    let listing  = await Listing.findById(id).populate("reviews");
   
    res.render("listing/show.ejs" , {listing});
    // if(!listing){
    //     req.flash("error" , "Listing your are requested for does not exist");
    //     res.redirect("/listing");
    // } handle later
});
 
 
 
 router.post("/" , validateLisiting,  wrapAsync(async(req , res , next)=>{
     
    //  if(!req.body.listing){
    //      throw new ExpressError(400 , "send valid data from listing");
    //  }
 
         const newListing = new Listing(req.body.listing);
         await newListing.save();
         req.flash("success" , "New Listing Created");
         res.redirect("/listing");
       
         console.log(newListing);
        
         
        
         //next(err);
 }));
 
 router.get("/:id/edit", isLogedIn, async(req , res)=>{
     let {id} = req.params;
     const listing = await Listing.findById(id);
     res.render("listing/edit.ejs" , {listing});
     
 })
  
 router.put("/:id" , validateLisiting , async (req , res)=>{
     //alternative is
     // let {id} = req.params;
     // let {price: newprice} = req.body;
     // await Listing.findByIdAndUpdate(id , {price: newprice});
 
     //usting key value pair we deconstruct the listing using (...) dots
     let {id} = req.params;
     await Listing.findByIdAndUpdate(id , {...req.body.listing});
     res.redirect("/listing");
    
 })
 
 router.delete("/:id" , isLogedIn,  async (req , res)=>{
     let {id} = req.params;
     let deletedList = await Listing.findByIdAndDelete(id);
     req.flash("success" , "Listing Is Deleted");
     console.log(deletedList);
     res.redirect("/listing");

 })

 module.exports = router;
 