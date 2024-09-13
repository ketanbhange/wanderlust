const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");


app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

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

app.post("/listing" , (req , res)=>{
    const newListing = new Listing(req.body.listing);
    newListing.save();
    console.log(newListing);
    res.redirect("/listing");
})

app.get("/listing/:id/edit", async(req , res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs" , {listing});
})

app.put("/listing/:id" , async (req , res)=>{
    //alternative is
    // let {id} = req.params;
    // let {price: newprice} = req.body;
    // await Listing.findByIdAndUpdate(id , {price: newprice});

    //usting key value pair we deconstruct the listing using (...) dots
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect("/listing");
})

app.delete("/listing/:id" , async (req , res)=>{
    let {id} = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listing");
})


app.get("/listing/:id" , async(req , res)=>{
    let {id} = req.params;
    let listing  = await Listing.findById(id);
    res.render("listing/show.ejs" , {listing});
})


 
app.listen(3000 , ()=>{
    console.log("app listening on 3000");
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