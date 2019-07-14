const mongoose=require('mongoose');

var customerSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobNo:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                return /\d{10}/.test(v);
            },
            message:props=>` ${props.value} is not 10 digit mobileNo.`
        }
    },
    customerType:{
        type:String,
        required:true
    }
    
});

module.exports=mongoose.model("customer",customerSchema);