import { asyncHandler } from "../utils/asynchandlers.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"
// import { use } from "react";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user datail from frontend
  //validation - not empty
  // check  username and email exists or not
  //check images and avtar
  //upload them on cloudinary
  //create user object -  create entry db
  // reomove pasword and refresh token in reponse
  //check for user creation
  const { fullname, email, username, password, } = req.body
  console.log("email:", email);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(res.status(400).json({ message: "Al field are requuired" }))
  } if (!email.include("@")) {
    throw new ApiError(res.status(400).json({ message: "email is not valid" }))
  }
  const existedUser = User.findOne(
    {
      $or: [{ username }, { email }]
    }
  )

  if (existedUser) {
    throw new ApiError(409, "user is already existed")
  }

  const avtarLocalpath = req.files?.avtar[0]?.path
  const coverImageLocalpath = req.files?.coverImage[0]?.path

  if (!avtarLocalpath) {
    throw new ApiError(400, "avtar is required");
  }

  const avtar = await uploadoncloudinary(avtarLocalpath)
  const coverImage = await uploadoncloudinary(coverImageLocalpath)

  if (!avtar) {
    throw new ApiError(400, "avtar file is required");
  }
  const user = User.create({
    fullname,
    avtar:avtarLocalpath,
    coverImage:coverImageLocalpath?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createduser =user.findById(user._id).select(  //this will remove password and refresh token in response
    "-password -refreshToken"
  )
  if (!createduser) {
    throw new ApiError(500,"something went wrong while registering the user")
    
  }
  
  return res.status(200).json(
     new ApiResponse( 201, createduser,"user registerd successfully")
    
  )


});

export { registerUser };