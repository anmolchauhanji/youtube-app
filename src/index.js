import mongoose from "mongoose";
import dotenv from "dotenv";
import {app} from "./app.js";
dotenv.config();

;( async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error.message);
    process.exit(1);
  }
})().then(
  app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`);
    
  })
)
.catch((err)=>{
  console.log("mongo db connection failed !!!",error);
  
})


console.log("Server started");


