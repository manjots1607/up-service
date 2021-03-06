const express=require('express');
const router = express.Router();
const db = require("../models/index");
const userRole=require("../models/userRoles");

const middleware=require('../middleware/middleware');

router.get("/",middleware.isAdmin,(req,res)=>{

    db.User.find({userRole:userRole.Engineer})
    .then((engineers)=>{
        db.User.find({userRole:userRole.CallCenterExec})
        .then((CallCenterExecs)=>{
            db.Call.aggregate([{$group:{_id:"$closed",count:{$sum:1}}}])
            .then(callStats=>{

                res.render("admin.ejs",{title:"Admin Home",userRole:userRole,engineers:engineers,CallCenterExecs:CallCenterExecs,isADashboard:true,callStats});
            }).catch(er=>{
                console.log(er);
                res.send(er);
            })
        })
        .catch((err)=>{
            console.log(err);
            res.redirect("/");
        })
    })
    .catch(err=>{
        console.log(err);
        res.redirect("/");
    });
    
});
router.get("/customers",middleware.isAdmin,(req,res)=>{
    console.log(req.originalUrl);
    db.Customer.find()
    .then((customers)=>{
        res.render("manageCustomers.ejs",{customers:customers,isACustomer:true});
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    })
    
});
router.get("/calls",middleware.isAdmin,(req,res)=>{
    db.CallType.find()
    .then(callTypes=>{
        res.render("manageCall.ejs",{callTypes:callTypes,isACalls:true});
    })
    .catch(err=>{
        console.log(err);
        res.redirect("/admin");
    })
});
router.post("/calls/callType",middleware.isAdmin,(req,res)=>{
    db.CallType.create({callType:req.body.callType})
    .then(callType=>{
        res.redirect("/admin/calls");
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    });
});


module.exports=router;