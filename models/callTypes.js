const mongoose=require('mongoose');

const callTypeSchema=new mongoose.Schema({
    callType:{
        type : String,
        required: true,
        unique:true
    }
});
module.exports=mongoose.model("callType",callTypeSchema);