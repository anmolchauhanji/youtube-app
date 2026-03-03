import {v2 as cloudinary  } from "cloudinary";
import { response } from "express";
import fs  from "fs";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
});

const uploadoncloudinary = async (localfilepath)=> {
    try {
    if (!localfilepath) { return null
        const response = await cloudinary.uploader.upload (localfilepath, {
            resource_type:"auto"
        }) 
            console.log("file is uploaded", response.url);
            return response;
        }
} catch (error) {
            fs.unLinkSync(localfilepath)
            return null
        }
        
   

}
console.log(process.env.CLOUDINARY_CLOUD_NAME);
export {uploadoncloudinary}