const express=require('express');
const router = express.Router();
const db = require("../models/index");
const middleware=require("../middleware/middleware");
const userRole=require("../models/userRoles");

router.get("/",middleware.isEngineer,(req,res)=>{
    db.Call.find({passedTo:req.user._id})
    .populate('callType')
    .populate('customer')
    .then(calls=>{
        
        res.render("engineer/home",{calls:calls});
    }).catch(err=>{
        console.log(err);
        res.json(err);
    })
});
router.get("/call/:id",middleware.isEngineer,(req,res)=>{
    db.Call.findById(req.params.id)
    .populate('createdBy')
    .populate('callType')
    .populate('customer')
    .then(call=>{
        console.log(call.createdBy.username);
        res.render("engineer/handleCall.ejs",{call:call});
    }).catch(err=>{
        console.log(err);
        res.send(err);
    })
});
router.post("/call/:id/update",middleware.isEngineer,(req,res)=>{
    var updatedCall={};
    if(req.body.mode=="closed"){
        updatedCall.closed=true;
        updatedCall.closedBy=req.user._id;
        updatedCall.closedAt=Date.now();
    }else{
        updatedCall.passed=true;
        updatedCall.passedTo=req.body.engineer;
    }
    db.Call.findByIdAndUpdate(req.params.id,updatedCall,{new:true})
    .then(uCall=>{
        console.log(uCall);
        res.redirect("/engineer");
    }).catch(err=>{
        console.log(err);
        res.send(err);
    })
});
module.exports=router;