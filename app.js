const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

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
app.get("/listing" , async(req , res)=>{
    let samplelisting = new Listing({
        title: "My new villa",
        description: "By the beach",
        price: 1200,
        location: "calangute, Goa",
        country: "india",
    })
    await samplelisting.save();
    console.log("sample was saved");
    res.send("successfull testing");
})

app.listen(3000 , ()=>{
    console.log("app listening on 3000");
})