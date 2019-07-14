const express = require('express'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    session = require('express-session'),
    indexRoutes = require("./routes/index"),
    adminRoutes = require("./routes/admin"),
    callCenterRoutes=require("./routes/callcenter"),
    engineerRoutes=require("./routes/engineer"),
    db = require('./models/index'),
    bodyParser=require('body-parser'),
    app = express();

//Express session
app.use(session({
    secret:"Dogs are cute",
    resave:false,
    saveUninitialized:false
}));

//passport Auth setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

app.use(bodyParser.urlencoded({extended:true}));

//log curUser
app.use(function(req,res,next){
    res.locals.title="";
    res.locals.curUser=req.user;
    res.locals.curUserRole=req.user?req.user.userRole:undefined;
    console.log("curUser: ",req.user?req.user.username:null);
    next();
});

app.set("view engine", "ejs");
app.use("/", indexRoutes);
app.use("/admin",adminRoutes);
app.use("/callcenter",callCenterRoutes);
app.use("/engineer",engineerRoutes);


app.listen(8000, () => {
    console.log("App Running on port : ", 8000);
})