const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const flash = require("connect-flash/lib/flash");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controller/users.js");


router.get("/signup" ,userController.rederSignUpform);

router.post("/signup" , userController.signUp);

router.get("/login" , userController.rederLoginForm);

router.post("/login" , saveRedirectUrl, passport.authenticate("local" , {failureRedirect: '/login' , failureFlash:true}), userController.Login );

router.get("/logout" , userController.logout);

module.exports = router;