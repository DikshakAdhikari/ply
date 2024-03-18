import mongoose, { Schema } from "mongoose";

const reviewsSchema= new mongoose.Schema({
    status:{
        type:String,
        enum:['pending','approve','reject'],
        required:true
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref:'product',
      required:true 
  },
    authorId: {
      type: Schema.Types.ObjectId,
      ref:'user',
      required:true 
  },
    author: {
        type: {
          productName: String,
          price: String,
          image:String,
          productDescription:String,
          department:String,
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