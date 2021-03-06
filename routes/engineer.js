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
        
        res.render("engineer/home",{calls:calls,isEDashboard:true});
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
        
        //updating Pending engineer
        db.Pending.findOne({engineer:req.body.engineer})
        .then(foundPend=>{
            const newPend={val:foundPend.val+1,engineer:foundPend.engineer};
            
            db.Pending.findByIdAndUpdate(foundPend._id,newPend)
            .then(updatedPend=>console.log(updatedPend))
            .catch(err=>console.log(err));
        })
        .catch(e=>console.log(e));
    }

    //Updating Pending 
    db.Pending.findOne({engineer:req.user._id})
    .then(foundPend=>{
        const newPend={val:foundPend.val-1,engineer:foundPend.engineer};
            
        db.Pending.findByIdAndUpdate(foundPend._id,newPend)
        .then(updatedPend=>console.log(updatedPend))
        .catch(err=>console.log(err));
    })
    .catch(e=>console.log(e));

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