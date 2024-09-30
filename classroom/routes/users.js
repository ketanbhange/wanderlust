const express = require("express");
const router = express.Router();



router.get("/" , (req ,res)=>{
    res.send("get request");
})

router.get("/:id" , (req ,res)=>{
    res.send("get request for id");
})

router.post("/" , (req ,res)=>{
    res.send("post request");
})

module.exports = router;