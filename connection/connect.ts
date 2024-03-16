import mongoose from "mongoose"
export const mongooseConnect = async()=> {
    try{
        if(process.env.DATABASE_URL){
            
       await mongoose.connect('mongodb://localhost:27017/blog')
       console.log('Connected Successfully');
        }
       
    }catch(err){
        console.log('Db Error' + err);
        
    }
    
}