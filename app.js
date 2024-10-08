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
const session = require("express-session");
const flash = require("connect-flash");
const cookie = require("express-session/session/cookie.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const UserRouter = require("./routes/user.js");



app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));



app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized : true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
    }
}
app.use(session(sessionOptions));
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req , res , next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.get("/demouser" , async (req , res) =>{
    let fakUser = new User({
        email: "student@gmail.com",
        username: "student",
    })

   let registeredUser = await User.register(fakUser , "helloworld");
   res.send(registeredUser);
})


app.use("/listing" , listing);
app.use("/listing/:id/reviews" , review);
app.use("/" , UserRouter);


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



app.listen(3002, ()=>{
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