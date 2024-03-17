import express from 'express'
import { verifyJwt } from '../middlewares/veriftJwt'
import review from '../models/reviews';
import restrictTo from '../services/authorization';

const reviewsRouter= express.Router()
reviewsRouter.post('/', verifyJwt, async(req,res)=> {
    try{
        const { obj , status, adminId, productId }= req.body;
        // console.log(obj);
        const ress= await review.insertMany({
            author:obj,
            status,
            //@ts-ignore
            adminId:req.userId,
            productId
        })
        res.json("saved successfully")     ;
    }catch(err){
        res.json(err);
    }
});

reviewsRouter.get('/profile/my-submissions', verifyJwt, restrictTo(['NORMAL']), async (req,res)=> {
    try{
        //@ts-ignore
        const mySubmissions= await review.find({authorId:req.userId});
        res.json(mySubmissions)

    }catch(err){
        res.json(err)
    }
})

export default reviewsRouter
