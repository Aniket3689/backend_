import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import {uploadOnCloudimary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";
const registerUser=asyncHandler(async (req,res)=>{
   //get user details from frontend 
   //vaildation -not empty
   //check if user already exists: username or email
   //check for image ,check for avater
   //upload them to cloudinary avater
   //create user object -create entry in db
   //remove password and refresh token field from response
   //check for user creation
   //return res 

   const {fullName,email,username,password}=req.body
   console.log("email :",email);

   if (
    [fullName,email,username.password].some((field)=>
         field?.trim()===""
    )
   ) {
     throw new ApiError(400,"All filds are reauired")
   }

   const existedUser=User.findOne({
    $or:[{username},{email}]
   })
   if (existedUser) {
      throw new ApiError(409,"userwith email or email allready exite ")
   }

    const avaterLocalPath=req.files?.avatar[0]?.Path;
    const coverImageLocalPath=res.files?.coverImage[0]?.path

    if (!avaterLocalPath) {
        throw new ApiError(400,"avatar file is required")
    }

    const avatar=await uploadOnCloudimary(avaterLocalPath);
    const coverImage =await uploadOnCloudimary(coverImageLocalPath)
   
    if (!avatar) {
        throw new ApiError(400,"avatar file is required")
    }
    
     const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url ||"",
        email,
        password,
        username:username.toLowerCase()
    })
    //remove password and referesh token field from response
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500,"some thing is worng while regid=stering user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User rigistered Successfull")
    )



})


export {registerUser}