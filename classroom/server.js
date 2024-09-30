const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const cookieParser = require("cookie-parser");


app.use(cookieParser());




app.get("/getcookies" , (req ,res)=>{
    res.cookie("hi" , "ketan");
    res.cookie("cookie1" , "ketan 1");
    res.send("cookie");
})

app.get("/" , (req , res)=>{
    res.dir(req.cookies);
    res.send("hi , i am root");
})


app.use("/users" , users);
app.use("/posts" , posts);



app.listen(3000 , ()=>{
    console.log("listening 3000");
})