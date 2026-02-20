import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"
import app from "./app.js"
import connectDB from "./db/index.js"
import dotenv from 'dotenv'
connectDB()
dotenv.config(
    {
       path: '.env'
    }
)
/*
;(async () => {
    try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",(error)=>{
        console.log("error",error);
        throw error
    }),
    app.listen(process.env.PORT)
    } catch (error) {
        console.log("error",error);

    }
 })()
 */