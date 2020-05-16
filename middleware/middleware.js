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
            return res.redirect("/login");
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
            return res.redirect("/login");
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
            return res.redirect("/login");
        }
    },
    isLogin:(req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
            return res.redirect("/login");
        }
    }
}