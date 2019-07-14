const userRole = require('../models/userRoles');
module.exports={
    isAdmin:(req,res,next)=>{
        if(req.isAuthenticated()){
            if(req.user.userRole===userRole.Admin){
                return next();
            }
            else{
                return res.send("You are not allowed to access this page..");
            }
        }
        else{
            return res.send("You are not LOgged in.")
        }
    },
    isCallCenter:(req,res,next)=>{
        if(req.isAuthenticated()){
            if(req.user.userRole===userRole.CallCenterExec){
                return next();
            }
            else{
                return res.send("You are not allowed to access this page..");
            }
        }
        else{
            return res.send("You are not LOgged in.")
        }
    },
    isEngineer:(req,res,next)=>{
        if(req.isAuthenticated()){
            if(req.user.userRole===userRole.Engineer){
                return next();
            }
            else{
                return res.send("You are not allowed to access this page..");
            }
        }
        else{
            return res.send("You are not LOgged in.")
        }
    }
}