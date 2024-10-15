const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const flash = require("connect-flash/lib/flash");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");


router.get("/signup" , (req , res)=>{
    res.render("users/signup");
})

router.post("/signup" , async (req  , res)=>{
    let {username , email , password} = req.body;
   let newUser =  new User({email , username});
  let registeredUser =  await User.register(newUser , password);
  console.log(registeredUser);
  
  req.login(registeredUser , (err)=>{ //this is a user can automaticaly login after sign in
    if(err){
        return next(err);
    }
    req.flash("success" , "user signup successfully");
    res.redirect("/listing");
  })
 
})

router.get("/login" , (req , res)=>{
    res.render("users/login.ejs");
})

router.post("/login" , saveRedirectUrl, passport.authenticate("local" , {failureRedirect: '/login' , failureFlash:true}), async(req , res)=>{
    req.flash("success" , "Welcome to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listing"; // this is for when we login first time on listing page;
    res.redirect(redirectUrl);
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