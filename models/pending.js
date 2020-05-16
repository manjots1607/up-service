const mongoose= require("mongoose");
const pendingSchema = new mongoose.Schema({
    engineer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    val:{
        type:Number,
        default:0
    }
});

module.exports=mongoose.model("pending",pendingSchema);