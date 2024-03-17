import mongoose, { Schema } from "mongoose";

const productSchema= new mongoose.Schema({ 
    productName:{
        type:String,
        required:false
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    createdBy:{
       type: Schema.Types.ObjectId,
       ref:'user',
       required:true 
    }
},{timestamps:true})


const product= mongoose.model('product',productSchema)
export default product