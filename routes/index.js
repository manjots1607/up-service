const express=require('express');
const router = express.Router();
const db = require("../models/index");
const passport = require("passport");
const userRole=require("../models/userRoles");
const middleware=require('../middleware/middleware');


router.get("/",(req,res)=>{
    
    res.render("index.ejs",{isHome:true});
});
router.get("/login",(req,res)=>{
    
    res.render("login",{isLogin:true});
});

router.post("/login",passport.authenticate("local",{
    failureRedirect:"/"
}),(req,res)=>{
    switch(req.user.userRole){
        case userRole.Admin : res.redirect("/admin");break;
        case userRole.CallCenterExec: res.redirect("/callcenter");break;
        case userRole.Engineer:res.redirect("/engineer");break;
    }
    
});
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/"); 
});
router.post("/register",middleware.isAdmin,(req,res)=>{
    
    const newUser={
        username:req.body.username,
        name:req.body.name,
        mobileNo:req.body.mobileNo,
        userRole:req.body.userRole 
    };
    db.User.register( new db.User(newUser),req.body.password,(err,user)=>{
        if(err){
            console.log(err);
    
        }
        else{
            console.log(user);
        }
        return res.redirect("/admin");
    });
});

router.post("/customer",(req,res)=>{
    const newCustomer={
        name:req.body.name,
        mobNo:req.body.mobNo,
        email:req.body.email,
        customerType:req.body.customerType
    };
    db.Customer.create(newCustomer)
    .then((newCustomer)=>{
        console.log("newCustomer");
        if(req.body.api){
            return res.json(newCustomer);
        }
        res.redirect("/admin/customers");
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    });
});

router.post("/api/customer/search",(req,res)=>{
    console.log(req.body);
    var regex;
    var search={};
    if(req.body.email){
        regex = new RegExp("^"+req.body.email+"$",'i');
        search.email=regex;
    }else if(req.body.name){
        regex= new RegExp(escapeRegex(req.body.name),'i');
        search.name=regex;
    }else if( req.body.mobNo){
        regex = req.body.mobNo;
        search.mobNo=regex;
    }
    
    db.Customer.find(search)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err);
    });
});
router.post("/api/searchengineer",(req,res)=>{
    console.log(req.body);
    var regex;
    var search={};
    search.userRole=userRole.Engineer;
    if(req.body.email){
        regex = new RegExp("^"+req.body.email+"$",'i');
        search.username=regex;
    }else if(req.body.name){
        regex= new RegExp(escapeRegex(req.body.name),'i');
        search.name=regex;
    }else if( req.body.mobNo){
        regex = req.body.mobNo;
        search.mobileNo=regex;
    }
    
    db.User.find(search)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err);
    });
});
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
module.exports=router;