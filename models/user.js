var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var userSchema=new mongoose.Schema({
    username:String,
    password:String,
    name:String,
    mobileNo:String,
    userRole:String,
    authorURL:{
      type:String,
      default: 'https://c8.alamy.com/comp/HBFR2F/male-profile-avatar-with-brown-hair-over-white-background-vector-illustration-HBFR2F.jpg'
    }
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("user",userSchema);