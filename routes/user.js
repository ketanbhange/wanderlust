const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const flash = require("connect-flash/lib/flash");
const passport = require("passport");


router.get("/signup" , (req , res)=>{
    res.render("users/signup");
})

router.post("/signup" , async (req  , res)=>{
    let {username , email , password} = req.body;
   let newUser =  new User({email , username});
  let registeredUser =  await User.register(newUser , password);
  console.log(registeredUser);
  req.flash("success" , "user signup successfully");
  res.redirect("/listing");
})

router.get("/login" , (req , res)=>{
    res.render("users/login.ejs");
})

router.post("/login" , passport.authenticate("local" , {failureRedirect: '/login' , failureFlash:true}), async(req , res)=>{
    req.flash("success" , "Welcome to wanderlust");
    res.redirect("/listing");
})

router.get("/logout" , (req , res , next) =>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success" , "you are logged out!");
        res.redirect("/listing");
    })
})

module.exports = router;