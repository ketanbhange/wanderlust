const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require('connect-flash');
const path = require("path");


//app.use(cookieParser());


app.use(session({secret:"mysupersecretstring" ,resave: false , saveUninitialized:true}));
app.use(flash());


app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

// app.get("/reqcount" , (req , res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1
//     }
    
//     res.send(`the req count is ${req.session.count}`);
// })


//storing and using information

// app.get("/register" , (req , res)=>{
//     let {name="ananomus"} = req.query;
    
//     req.session.name = name;
//     res.redirect("/hello");
// });

// app.get("/hello" , (req , res)=>{
//     res.send(`hello , ${req.session.name}`);
// })

//we can create for flash and we take same requests for flash
app.get("/register" , (req , res)=>{
    let {name="ananomus"} = req.query;
    req.session.name = name;
    if(name === "anonymus"){
        req.flash("success" , "user register successfully");
    }else{
        req.flash("error" , "user is not registered");
    }
  
    res.redirect("/hello");
});


app.get("/hello" , (req , res)=>{
   // res.render("page.ejs" , {name: req.session.name , msg: req.flash("success")});
   //another simple method is res.locals
   res.locals.messages = req.flash("success");
   res.locals.error = req.flash("error");
   res.render("page.ejs" , {name:req.session.name});
})




// app.get("/test" , (req , res)=>{
//     res.send("test successfull");
// })



// app.use(cookieParser("secretcode")); //this parser is works both signed and unsigned


// app.get("/getsignedcookie" , (req ,res)=>{
//     res.cookie("made-In" , "india" ,{signed:true});
//     res.send("signed cookie sent");
// })

// app.get("/verify" , (req , res) =>{
//     console.log(req.signedCookies);
//     res.send("verify");
// })


// app.get("/getcookies" , (req ,res)=>{
//     res.cookie("hi" , "ketan");
//     res.cookie("cookie1" , "ketan 1");
//     res.send("cookie");
// })


// app.get("/greet" , (req , res)=>{
//     let {name = "anonymus"} = req.cookies;
//     res.send(`hi ${name}`);
// })

// app.get("/" , (req , res)=>{
//     console.dir(req.cookies);
//     res.send("hi , i am root");
// })


// app.use("/users" , users);
// app.use("/posts" , posts);



app.listen(3000 , ()=>{
    console.log("listening 3000");
})