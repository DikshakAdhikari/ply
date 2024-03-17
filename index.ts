import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user'
import cors from 'cors'
import { mongooseConnect } from './connection/connect'
import productRouter from './routes/productRoute'
import reviewsRouter from './routes/reviewsRouter'
dotenv.config()


const app= express()
mongooseConnect()
// app.use(cors({
//     origin: 'https://dikshak-blogging.vercel.app', 
//     credentials:true
//   })); 

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials:true
})); 
app.use(express.json())
app.use(express.static('public')) 

app.use('/user',userRouter)
app.use('/product', productRouter)
app.use('/review', reviewsRouter)
app.use('/', (req,res)=> {
  res.json({message:"Hello baby"})
})

app.listen(process.env.PORT , ()=> console.log(`Server listening on port ${process.env.PORT}`))




