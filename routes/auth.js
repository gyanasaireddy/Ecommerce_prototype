var express=require("express");
var router=express.Router()
var passport=require("passport"),
	user=require("../models/user")
router.get("/",function(req,res){
  res.render("app");
}) 


router.get("/register",function(req,res){
	res.render("register")
})

router.post("/register", function(req, res){
    user.register(new user({username: req.body.username}), req.body.password, function(err, user){
        if(err){
					req.flash("error",err.message)
						console.log(err);
            return res.redirect('/register');//edi main file anamaata
        }
        passport.authenticate("local")(req, res, function(){
					req.flash("success","Welcome to YelpCamp "+user.username)
           res.redirect("/campgrounds");
        });
    });
});

router.get("/login",function(req,res){
	// req.flash("error","You must be logged in!!")
	res.render("login");
})

router.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),function(req,res){
})

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged you out")
	res.redirect("/campgrounds");
})

function islogged(req,res,next)
{
	if(req.isAuthenticated())
		{
			return next();
		}
	else
		res.redirect("/login")
}

module.exports=router