const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const exp = require("constants");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

main().then(()=>{
    console.log("successfull");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
app.get("/" , (req , res)=>{
    res.send("i am root");
})

app.get("/listing" , async (req , res)=>{
   let allListing =  await Listing.find({});
   res.render("listing/index.ejs" ,{allListing});
})
//this get before id because it treat like a id to new

app.get("/listing/new" , (req, res)=>{
    res.render("listing/new.ejs");
})

app.post("/listing" , wrapAsync(async(req , res , next)=>{
    let result = listingSchema.validate(req.body);
    console.log(result);
    if(result.error){
        throw new ExpressError(400 , result.error);
    }
    if(!req.body.listing){
        throw new ExpressError(400 , "send valid data from listing");
    }

        const newListing = new Listing(req.body.listing);
        await newListing.save();
        console.log(newListing);
        res.redirect("/listing");
        next(err);
}));

app.get("/listing/:id/edit", wrapAsync(async(req , res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs" , {listing});
}))

app.put("/listing/:id" , wrapAsync(async (req , res)=>{
    //alternative is
    // let {id} = req.params;
    // let {price: newprice} = req.body;
    // await Listing.findByIdAndUpdate(id , {price: newprice});

    //usting key value pair we deconstruct the listing using (...) dots
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect("/listing");
}))

app.delete("/listing/:id" , wrapAsync(async (req , res)=>{
    let {id} = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listing");
}))


app.get("/listing/:id" , wrapAsync(async(req , res)=>{
    let {id} = req.params;
    let listing  = await Listing.findById(id);
    res.render("listing/show.ejs" , {listing});
}))
 
app.listen(3000 , ()=>{
    console.log("app listening on 3000");
})

app.all("*" , (req , res , next)=>{
    next(new ExpressError(404 , "page not found"));
});
app.use((err , req , res , next) =>{
    let {statusCode=500 , message="somtging went wrong"} = err;
    res.status(statusCode).render("error.ejs" , {message});
   // res.status(statusCode).send(message);
})

app.use((err , req , res , next)=>{
    res.send("something went wrong");
})










// app.get("/listing" , async(req , res)=>{
//     let samplelisting = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "calangute, Goa",
//         country: "india",
//     })
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("successfull testing");
// })