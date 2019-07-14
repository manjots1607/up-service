var mongoose=require("mongoose");
mongoose.set("debug",true);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/callingApp",{useNewUrlParser:true});

mongoose.Promise=Promise;
module.exports.User=require("./user.js");
module.exports.Customer=require("./customer.js");
module.exports.CallType=require("./callTypes");
module.exports.Call=require("./call");
