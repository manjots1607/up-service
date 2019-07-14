const express=require('express');
const router = express.Router();
const db = require("../models/index");
const userRole=require("../models/userRoles");

const middleware=require('../middleware/middleware');

router.get("/",middleware.isCallCenter,(req,res)=>{
    db.Call.find({createdBy:req.user._id})
    .then(calls=>{
        console.log(calls);
        var callData={
            total:0,
            passed:0,
            closed:0
        };
        
        calls.forEach((call)=>{
            callData.total=callData.total+1;
            if(call.passed){
                callData.passed=callData.passed+1;
            }
            else if(call.closedBy.equals(req.user._id)){
                callData.closed=callData.closed+1;
            }

        });
        return res.render("callCenter/callcenter.ejs",{callData:callData});
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    });
    
});
router.get("/newcall",middleware.isCallCenter,(req,res)=>{
    db.CallType.find()
    .then(CallTypes=>{
        res.render("callCenter/newCall.ejs",{CallTypes:CallTypes});
    })
    .catch(err=>{
        res.send(err);
    });
   
});
router.post("/newcall",middleware.isCallCenter,(req,res)=>{
    const newCall={
        callType:req.body.callType,
        demand:req.body.demand,
        customer:req.body.customer,
        createdBy:req.user._id
    };
    if(req.body.mode==="closed"){
        newCall.closed=true;
        newCall.closedBy=req.user._id;
        newCall.closedAt=Date.now();
    }else{
        newCall.passed=true;
        newCall.passedTo=req.body.engineer;
    }
    db.Call.create(newCall)
    .then(newCall=>{
        console.log(newCall);
        res.redirect("/callcenter");
    })
    .catch(err=>{
        res.send(err);
    });
})


module.exports=router;