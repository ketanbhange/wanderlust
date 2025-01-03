
const Listing = require("../models/listing.js");

module.exports.index = async (req , res)=>{
    let allListing =  await Listing.find({});
    res.render("listing/index.ejs" ,{allListing});
}

module.exports.renderNewform = (req, res)=>{
    res.render("listing/new.ejs");
}

module.exports.showListings = async(req , res)=>{
    let {id} = req.params;
    let listing  = await Listing.findById(id).populate("reviews").populate("owner");
    console.log(listing);
    res.render("listing/show.ejs" , {listing , currUser: req.user});
    if(!listing){
        req.flash("error" , "Listing your are requested for does not exist");
        res.redirect("/listing");
    } // handle later
}

module.exports.creatListings = async(req , res , next)=>{
     
    //  if(!req.body.listing){
    //      throw new ExpressError(400 ,"send valid data from listing");
    //  }
 
         const newListing = new Listing(req.body.listing);
         newListing.owner = req.user._id;
         await newListing.save();
         req.flash("success" , "New Listing Created");
         res.redirect("/listing");
       
         console.log(newListing);
        
         //next(err);
 }

 module.exports.rederEditForm =  async(req , res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs" , {listing});
    
}



module.exports.updateListing = async (req , res)=>{
    //alternative is
    // let {id} = req.params;
    // let {price: newprice} = req.body;
    // await Listing.findByIdAndUpdate(id , {price: newprice});

    //usting key value pair we deconstruct the listing using (...) dots
     let {id} = req.params;
    let listing =   await Listing.findById(id);
     if(!listing.owner.equals(req.user._id)){
        req.flash("error" , "you dont have permission to edit");
       return  res.redirect(`/listing/${id}`);
       }

    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/listing/${id}`);
}

module.exports.destroyListing = async (req , res)=>{
    let {id} = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Is Deleted");
    console.log(deletedList);
    res.redirect("/listing");

}