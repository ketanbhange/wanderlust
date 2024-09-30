const express = require("express");
const router = express.Router();

router.get("/" , (req ,res)=>{
    res.send("posts request");
})

router.get("/:id" , (req ,res)=>{
    res.send("posts request for id");
})

router.post("/" , (req ,res)=>{
    res.send("post request");
})


module.exports = router;
