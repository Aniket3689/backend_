import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema(
    {
        videoFile:{
            type:string,//cloudinart url
            require:true,
        },
        thumbnail:{
            type:string,//cloudinart url
            require:true,
        },
        title:{
            type:string,
            require:true,
        },
       description:{
            type:string,
            require:true,
        },
        duration:{
            type:Number,//cloudinart url
            require:true,
        },
        views:{
            type:Number,
            require:true
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owern:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        }


    },{timestamps:true}
)
videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.Schema("Video",videoSchema)