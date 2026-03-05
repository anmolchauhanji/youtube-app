import { asyncHandler } from "../utils/asynchandlers.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"
// import { use } from "react";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"

const generateAccessTokenAndgenerateRefreshToken = async (userId) => {
  
  try {
    
    const user = await User.findById(userId)
    // dd
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}

  } catch (error) {
    throw new ApiError(500,"something went wrong while generating access and refresh token")
    
  }
}

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
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  } if (!email.includes("@")) {
    throw new ApiError(400, "email is not valid")
  }
  const existedUser = await User.findOne(
    {
      $or: [{ username }, { email }]
    }
  )

  if (existedUser) {
    throw new ApiError(409, "user is already existed")
  }

  const avtarLocalpath = req.files?.avtar?.[0]?.path;
  const coverImageLocalpath = req.files?.coverImage?.[0]?.path;

  if (!avtarLocalpath) {
    throw new ApiError(400, "avtar is required");
  }

  console.log("Uploading avatar from:", avtarLocalpath);
  const avtar = await uploadoncloudinary(avtarLocalpath)
  console.log("Avatar upload response:", avtar);
  
  console.log("Uploading cover image from:", coverImageLocalpath);
  const coverImage = await uploadoncloudinary(coverImageLocalpath)
  console.log("Cover image upload response:", coverImage);

  if (!avtar) {
    throw new ApiError(400, "avtar file is required");
  }
  const user = await User.create({
    fullname,
    avtar: avtar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createduser = await User.findById(user._id).select(  //this will remove password and refresh token in response
    "-password -refreshToken"
  )
  if (!createduser) {
    throw new ApiError(500, "something went wrong while registering the user")

  }

  return res.status(200).json(
    new ApiResponse(201, createduser, "user registerd successfully")

  )


});

const loginUser = asyncHandler(async (req,res) => {
  
// req -> data
// username or email to check
// find user
// password check
// access and refresh token
// send cookie

const {username,email,password,fullname} = req.body

if (!username|| !email) {
  throw new ApiError(404,"username or email is not found");

const user = await user.findOne({
  $or:[{email},{username}]
})

if (!user) {
  throw new ApiError(404,"user does not exist");
}

const isPassworValid = await user.isPassworCorrect(password)

if (!isPassworValid) {
   throw new ApiError(401,"password is not valid")
  
}
generateAccessTokenAndgenerateRefreshToken(user._id)
}

})
export { registerUser,loginUser };