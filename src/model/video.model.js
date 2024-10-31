import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const vedioSechma = new Schema(
    {
        vedioFile:{
            type:String,
            required:true
        },

        thumbnail:{
            type:String,
            required:true
        },

        title:{
            type:String,
            required:true
        },

        discription:{
            type:String,
            required:true
        },

        duration:{
            type:Number,
            required:true
        },

        views:{
            type:Number,
            default:0
        },

        isPublished:{
            type:Boolean,
            default:true
        },

        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }



    },

    {
        timestamps:true
    }
)


vedioSechma.plugin(mongooseAggregatePaginate)
export const Vedio = mongoose.model("Vedio", vedioSechma)