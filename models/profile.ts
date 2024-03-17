import mongoose, { Schema } from "mongoose";

const profileSchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    approveHistory: [{
        timestamp: {
            type:Number,
        }
    }],
    rejectHistory: [{
        timestamp: {
            type:Number,
        }
    }],
    visitHistory: [{
        timestamp: {
            type:Number,
        }
    }],
});

const profile= mongoose.model('profile',profileSchema)
export default profile