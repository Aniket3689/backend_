import mongoose, { Schema } from "mongoose";
const userchema=new Schema({
      username:{
        type:String,
        require:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true
      },
      email:{
        type:String,
        require:true,
        unique:true,
        lowecase:true,
        trim:true,
      },
      fullname:{
        type:String,
        require:true,
        trim:true,
        index:true,
      },
      avatar:{
        type:String,
        require:true,
      },
      coverImage:{
        type:String,  
      },
      watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
      ],
      password:{
            type:String,
            require:[true,'password is requried']
      },
      refreshToken:{
        type:string
      },

},{timestamps:true})
export const User=mongoose.model("user",userchema)