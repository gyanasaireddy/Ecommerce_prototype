var Campground=require("../models/campground")
var comment=require("../models/comment")
var middleWareObj={};
middleWareObj.islogged=function islogged(req,res,next)
{
	if(req.isAuthenticated())
		{
			return next();
		}
	else{
    req.flash("error","You must be Logged in!")
		res.redirect("/login")

  }
}
middleWareObj.checkOwnership=function checkOwnership(req,res,next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id,function(err,camp){	
      if(err)
        res.redirect("back")
      else if(camp.author.id.equals(req.user.id))
          next();
      else{
        req.flash("error","You Don't have permission to do that")
        res.redirect("back")
      }
  
    })}
      else
        res.redirect("back")
}

module.exports=middleWareObj