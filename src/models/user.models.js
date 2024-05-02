import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import  bcrypt from "bcrypt"
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

userchema.pre("save",async function (next){
        if(!this.isModified("password")) return next()

        this.password=await bcrypt.hash(this.password,10)
        next();
})
userchema.method.ispasswordcorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

export const User=mongoose.model("user",userchema)