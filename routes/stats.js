const express=require('express');
const router = express.Router();
const db = require("../models/index");
const userRole=require("../models/userRoles");

const middleware=require('../middleware/middleware');

router.get("/individual/:id",middleware.isAdmin,(req,res)=>{
    db.Call.find({$or:[{closedBy:req.params.id},{passedTo:req.params.id},{createdBy:req.params.id}]})
    .populate("customer")
    .populate("callType")
    .populate("createdBy")
    .then(foundData=>{
        db.User.findById(req.params.id)
        .then(foundEmp=>{
            const sendObj={calls:foundData,empName:foundEmp.name,userRole:foundEmp.userRole};
            res.render("admin/individualstats",{sendObj});
        }).catch(er=>{
            console.error(er);
            res.redirect("/admin");
        })
        
    })
    .catch(err=>{
        console.log(err);
        res.redirect("/admin");
    });
});
router.get("/totalCalls",middleware.isAdmin,(req,res)=>{
    db.Call.find({})
    .populate("customer")
    .populate("callType")
    .populate("createdBy")
    .then(foundData=>{    
        const sendObj={calls:foundData,type:"All"};
        res.render("admin/statsByType",{sendObj});
    }).catch(er=>{
        console.error(er);
        res.redirect("/admin");
    });
        
    
});
router.get("/closedCalls",middleware.isAdmin,(req,res)=>{
    db.Call.find({closed:true})
    .populate("customer")
    .populate("callType")
    .populate("createdBy")
    .then(foundData=>{    
        const sendObj={calls:foundData,type:"Closed "};
        res.render("admin/statsByType",{sendObj});
    }).catch(er=>{
        console.error(er);
        res.redirect("/admin");
    });
        
    
});
router.get("/pendingCalls",middleware.isAdmin,(req,res)=>{
    db.Call.find({closed:false})
    .populate("customer")
    .populate("callType")
    .populate("createdBy")
    .then(foundData=>{    
        const sendObj={calls:foundData,type:"Pending"};
        res.render("admin/statsByType",{sendObj});
    }).catch(er=>{
        console.error(er);
        res.redirect("/admin");
    });
        
    
});
module.exports=router;