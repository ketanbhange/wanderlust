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
const {listingSchema , reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
const listing = require("./routes/listing.js");
const review = require("./routes/review.js");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));



app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.use("/listing" , listing);
app.use("/listing/:id/reviews" , review);


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



app.listen(3000 , ()=>{
    console.log("app listening on 3000");
})

app.all("*" , (req , res , next)=>{
    next(new ExpressError(404 , "page not found"));
});
app.use((err , req , res , next) =>{
    let {statusCode=500 , message="something went wrong"} = err;
    res.status(statusCode).render("error.ejs" , {message});
   // res.status(statusCode).send(message);
})



// app.use((err , req , res , next)=>{
//     res.send("something went wrong");
// })










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