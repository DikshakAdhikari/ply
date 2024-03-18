import express from 'express'
import { verifyJwt } from '../middlewares/veriftJwt'
import review from '../models/reviews';
import restrictTo from '../services/authorization';

const reviewsRouter= express.Router()
reviewsRouter.post('/', verifyJwt, async(req,res)=> {
    try{
        const { obj , status, productId }= req.body;
        const ress= await review.insertMany({
            author:obj,
            status,
            //@ts-ignore
            authorId:req.headers["userId"],
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
});

reviewsRouter.get('/pending-requests', verifyJwt, restrictTo(['ADMIN']), async (req, res)=> {
    try{
        const pending= await review.find({status:"pending"}).populate("productId")
        res.json(pending);
    }catch(err){
        res.json(err);
    }
})

reviewsRouter.get('/pending-requests/:request_id', verifyJwt, restrictTo(['ADMIN']), async (req,res)=> {
    try{
        const requestWithId= await review.findOne({ $and:[{_id:req.params.request_id}, {status:"pending"}]});
        res.json(requestWithId);
    }catch(err){
        res.json(err)
    }
})

reviewsRouter.put('/update/:id', verifyJwt, restrictTo(['ADMIN']), async (req, res)=> {
    try{
        const {status} = req.body
        const updateProduct = await review.findByIdAndUpdate(req.params.id ,{
            status
        } );
        res.json(" Reviewed successfully! ")
    }catch(err){
        res.json(err)
    }
})

export default reviewsRouter
