import mongoose, { Schema } from "mongoose";

const reviewsSchema= new mongoose.Schema({
    status:{
        type:String,
        enum:['pending','approved','reject'],
        required:true
    },
    author: {
        type: {
          productName: String,
          price: String,
          image:String,
          productDescription:String,
          department:String,
          createdBy:{
            type: Schema.Types.ObjectId,
            ref:'user',
            required:true 
         }
        },
        required: true
      },
    adminId: {
        type: Schema.Types.ObjectId,
        ref:'user',
        required:false 
    }
})

const review= mongoose.model('review',reviewsSchema)
export default review