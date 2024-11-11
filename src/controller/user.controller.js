import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js";
import {User} from "../model/user.model.js"
import {uploadOnCloudinary} from "cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res) => {
    // get user details from frontend
    // validation -atleast not empty
    // already exists
    // check for images and avatar
    //upload to cloudinary
    // create user object - create db entry
    // remove password and refresh token from response 
    // check for user creation
    // return res


    const {fullName, userName, email, password} = req.body
    console.log("Email ==> ", email)

    if(fullName === "" || userName==="" || email==="" || password===""){
        throw new ApiError(400, "All fields are required")
        
    }

    const existedUser = User.findOne({
        $or: [{ userName },{ email }]
    })

    if (existedUser) {
        throw new ApiError(409,"User with same userName or email exist");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar file is required");
        
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Somthing went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User registered succefully")
    )
})

export { registerUser }