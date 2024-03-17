import mongoose, { Schema } from "mongoose";

const reviewsSchema= new mongoose.Schema({
    status:{
        type:String,
        enum:['pending','approved','reject'],
        required:true
    },
    productId:{
      type:String,
      required:true
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref:'user',
      required:false 
  },
    author: {
        type: {
          productName: String,
          price: String,
          image:String,
          productDescription:String,
          department:String,
          createdBy:{
            type: String
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