var express=require("express");
var router=express.Router()
var Campground=require("../models/campground")
var middleWare=require("../middleware")

router.get("/",function(req,res){

    Campground.find({},function(err,camp){
      if(err)
      console.log(err)
      else{
      console.log(camp)
      res.render("campgrounds/camps",{grounds:camp})
    }
    })
})

router.post("/",middleWare.islogged,function(req,res){
  var name=req.body.name;
  var image=req.body.image;
  var price=req.body.price;
  var desc=req.body.desc;
	    var author = {
        id: req.user._id,
        username: req.user.username
    }

  var camp={name:name,image:image,desc:desc,author:author,price:price};
	console.log("########################")
	console.log(req.user);
	console.log(camp);
		console.log("########################")

  Campground.create(camp,function(err,ne){
    if(err)
    {
      console.log(err)
    }
    else{
      res.redirect("/campgrounds")
    }
  });
})

router.get("/new",middleWare.islogged,function(req,res){
  res.render("campgrounds/new");
})

router.get("/:id",function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err,fnd){
    if(err)
    console.log(err)
    else
    {
      console.log("=============#####===================");
      console.log(fnd);
      res.render("campgrounds/show",{camps:fnd});

    }
  });
})

router.get("/:id/edit",middleWare.checkOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,camp){	
				res.render("campgrounds/edit",{camp:camp})
	})
})	

router.put("/:id",middleWare.checkOwnership,function(req,res){
		Campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,event){
			if(err){
				console.log(err)
			}
			else{
				res.redirect("/campgrounds/"+req.params.id)
			}
		})
})



router.delete("/:id",middleWare.checkOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		res.redirect("/campgrounds")
	})
})



module.exports=router;