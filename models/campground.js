var mongoose=require("mongoose");

var campgroundSchema=new mongoose.Schema({
  name:String,
  price:String,
  image:String,
  desc:String,
  comments: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "comment"
    }
 ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
});

module.exports=mongoose.model("Campground",campgroundSchema);