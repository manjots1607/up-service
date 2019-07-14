const mongoose = require("mongoose");


const callSchema = new mongoose.Schema({
    callType: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'callType',
        required: true

    },
    demand: {
        type: String,
        required:true
    },
    customer: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true

    },
    passed: { type: Boolean, default: false },
    passedTo: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
        

    },
    closed: { type: Boolean, default: false },
    closedBy: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    },
    closedAt: Date

});
module.exports = mongoose.model("call", callSchema);