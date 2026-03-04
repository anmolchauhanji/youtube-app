import {v2 as cloudinary  } from "cloudinary";
import { response } from "express";
import fs  from "fs";
import path from "path";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
});

const uploadoncloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) { 
            console.log("No filepath provided");
            return null
        }
        
        // Check if file exists
        if (!fs.existsSync(localfilepath)) {
            console.error("File not found at path:", localfilepath);
            return null;
        }
        
        console.log("File exists, uploading from:", localfilepath);
        console.log("Cloudinary config:", {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            has_api_key: !!process.env.CLOUDINARY_API_KEY,
            has_api_secret: !!process.env.CLOUDINARY_SECRET_KEY
        });
        
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        }) 
        console.log("File uploaded successfully to Cloudinary:", response.url);
        
        // Delete file from public/temp after successful upload
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
            console.log("Temporary file deleted:", localfilepath);
        }
        
        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        console.error("Full error:", error);
        
        // Delete temp file on error
        if (localfilepath && fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
            console.log("Temporary file deleted after error");
        }
        return null
    }
}

console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
export {uploadoncloudinary}