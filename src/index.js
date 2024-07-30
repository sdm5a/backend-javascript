// require('dotenv').config({path:'./env'})

import dotenv from 'dotenv'
import { app } from './app.js';
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    
    app.on("Error",(error)=>{
        console.log("Error from express app",error)
    })

    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is runnig at port : ${process.env.PORT}`)
    })
})
.catch(()=>{
    console.log("MongoDB connection failed!")
})



















/*


import express from 'express';
const app=express();

( async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

       app.on("Error",(error)=>{
            console.log("Error from express app",error)
       })

       app.listen(process.env.PORT,()=>{
        console.log(`Your app is listening on port ${process.env.PORT}`)
       })
    } catch (error) {
        console.log("ERROR OCCUR : ", error)
    }

})();
*/