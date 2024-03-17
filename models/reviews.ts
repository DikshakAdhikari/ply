import mongoose, { Schema } from "mongoose";

const reviewsSchema= new mongoose.Schema({
    status:{
        type:String,
        enum:['pending','approved','reject'],
        required:true
    },
    author: {
        type: {
          name: String,
          email: String
        },
        required: true
      },
    adminId: {
        type: Schema.Types.ObjectId,
        ref:'user',
        required:false 
    }
})