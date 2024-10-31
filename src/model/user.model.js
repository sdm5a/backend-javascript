import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSechma = new Schema(
    {
        userName:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },

        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },

        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },

        avatar:{
            type:String,
            required:true
        },

        coverImage:{
            type:String
        },

        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Vedio"
            }
        ],

        password:{
            type:String,
            required:[true,'Password is required']
        },

        refreshToken:{
            type:String
        }
    },

    {
        timeseries:true
    }
)

userSechma.pre( "save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
} )

userSechma.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSechma.methods.generateAccessToken = function (){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
} 

userSechma.methods.generateRefreshToken = function (){
    jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
} 

export const User = mongoose.model("User", userSechma)