const User = require("../models/user.js");



module.exports.rederSignUpform =  (req , res)=>{
    res.render("users/signup");
}

module.exports.signUp = async (req  , res)=>{
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
 
}

module.exports.rederLoginForm = (req , res)=>{
    res.render("users/login.ejs");
}

module.exports.Login = async(req , res)=>{
    req.flash("success" , "Welcome to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listing"; // this is for when we login first time on listing page;
    res.redirect(redirectUrl);
}

module.exports.logout = (req , res , next) =>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success" , "you are logged out!");
        res.redirect("/listing");
    })
}
