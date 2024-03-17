import express from 'express'
import { verifyJwt } from '../middlewares/veriftJwt'
import blog from '../models/product'
import { putObject } from '../services/aws-client'
import product from '../models/product'
const productRouter= express.Router()



// productRouter.post('/', verifyJwt ,  async(req,res)=> {
//     try{
//         const {title , description, filename, contentType}= req.body
        
//          const userId= req.headers['userId']
         
//         const data = await product.create({
//             imageUrl: `https://s3.ap-south-1.amazonaws.com/blog.dikshak/uploads/profile-pic/image-${filename}`,
//             title: title,
//             description: description,
//             createdBy: userId,
//         })
//         await data.save()
        
//     res.json('Blog successfully uploaded!')
        
//     }catch(err){
//         res.json(err)
//     }
// });



productRouter.post('/picture' , async (req,res)=> {
    try{
        const {filename, contentType}= req.body;
        const url= await putObject(`image-${filename}`, contentType);
        res.json(url)   
        
    }catch(err){
        res.json(err)
    }
} );

productRouter.get('/', async (req,res)=> {
    try{
        const data= await product.find({});
        res.json(data)

    }catch(err){
        console.log(err);
        
    }
})


productRouter.put('/update/:productId', verifyJwt, async (req,res)=> {
    try{
        const {productName, price, productDescription, department, filename}= req.body   
       
          
        const UserId= req.headers['userId']
        const img = `https://s3.ap-south-1.amazonaws.com/blog.dikshak/uploads/profile-pic/image-${filename}`;
        console.log(img);
        

             const updateProduct = await product.findByIdAndUpdate(req.params.productId ,{
                productName: productName,
                 price: price,
                  productDescription :productDescription,
                department:department,
                createdBy: UserId,
                image: img
            } );
            
            res.json('product updated successfully!')
    }catch(err){
        res.status(403).json
    }
})


productRouter.get('/userProduct', verifyJwt, async(req,res)=> {
    try{
        const userProduct= await product.find({createdBy:req.headers['userId']}).sort({updatedAt:"desc"})
        res.json(userProduct)
        
    }catch(err){
        res.status(403).json(err)

    }
})

productRouter.get('/user/:productId', async (req,res)=> {
    try{
        const userName= await blog.findOne({_id:req.params.productId}).populate('createdBy')
        res.json(userName)
    }catch(err){
        res.status(403).json(err)
    }
})



export default productRouter