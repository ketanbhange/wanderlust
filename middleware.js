module.exports.isLogedIn = (req, res , next)=>{
    if(!req.isAuthenticated()){
        req.flash("error" , "you must be log in to create a listing");
        return res.redirect("/login");
    }
    next();
}