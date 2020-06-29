var express=require("express");
var app=express();
var bop=require("body-parser");
var mongoose=require("mongoose"),
	passport=require("passport"),
	local=require("passport-local"),
	plm=require("passport-local-mongoose"),
	methodOverride=require("method-override"),
	flash=require("connect-flash")
	user=require("./models/user.js");
var Campground=require("./models/campground")
var comment=require("./models/comment.js")
var seed=require("./seeds");

var campgroundRoutes=require("./routes/campgrounds"),
	commentRoutes=require("./routes/comments"),
	authRoutes=require("./routes/auth")


mongoose.connect("mongodb://127.0.0.1:53393/c787e271-93aa-44c7-80bc-21f7cb2e8bf4?",{ useUnifiedTopology: true,
useNewUrlParser: true});


app.use(methodOverride("_method"));
app.use(flash());
app.use(bop.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"))
app.use(require("express-session")({
		secret:"Kodthe Dimma tirigipovali anthe",
		resave:false,
		saveUninitialized:false
		}))
app.use(passport.initialize())
app.use(passport.session())

//these variables can be used anywhere in the files
app.use(function(req, res, next){
	 res.locals.currentUser = req.user;
	 res.locals.error=req.flash("error");
	 res.locals.success=req.flash("success")
   next();
});

passport.use(new local(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

seed();

app.use("/campgrounds",campgroundRoutes);
app.use(authRoutes);
app.use("/campgrounds/:id",commentRoutes);


app.listen(3000,function(){
  console.log("server has stated");
})