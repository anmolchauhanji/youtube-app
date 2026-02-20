// utils vs controller
import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"

import   app from "./app.js"
;(async ()={
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log("error",error);
        
    }
 })()