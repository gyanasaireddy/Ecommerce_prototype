var express=require("express");
var router=express.Router({mergeParams: true});
var Campground=require("../models/campground")
var comment=require("../models/comment")
var middleWare=require("../middleware")

router.get("/comments/new",middleWare.islogged,function(req,res){
	Campground.findById(req.params.id,function(err,camp){
		if(err)
			console.log(err)
		else
				res.render("comments/new",{camp:camp})
	})
})

router.post("/comments",middleWare.islogged,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               req.flash("success","Successfully added comment")
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               console.log(comment);
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

router.post("/comments/:commid/edit",middleWare.checkOwnership,function(req,res){
    comment.findById(req.params.commid,function(err,event){
        if(err){
            res.redirect("back")
        }
        else{
            res.render("comments/edit",{comm:event,
                camid:req.params.id})
        }
    })
    
})
router.put("/comments/:commid",middleWare.checkOwnership,function(req,res){
        comment.findByIdAndUpdate(req.params.commid,req.body.comment,function(err,event){
            if(err){
                res.redirect("back")
            }
            else{
                res.redirect("/campgrounds/"+req.params.id)
            }
        })
})

router.delete("/comments/:commid",middleWare.checkOwnership,function(req,res){
    comment.findByIdAndRemove(req.params.commid,function(err,event){
        if(err){
            res.redirect("back")
        }
        else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})


  

module.exports=router;
