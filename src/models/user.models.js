import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import  bcrypt from "bcrypt"
const userSchema=new Schema({
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
      fullName:{
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

userSchema.pre("save",async function (next){
        if(!this.isModified("password")) return next()

        this.password=await bcrypt.hash(this.password,10)
        next();
})
userSchema.method.ispasswordcorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.grnerateAccessToken=function(){
  return jwt.sign(
  {
    _id: this_.id,
    email:this.email,
    username:this.username,
    fullName:this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  }
 )
}
userSchema.methods.grnerateRefreshToken=function(){
     return jwt.sign(
      {
        _id:this_.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
     )
}

export const User=mongoose.model("user",userSchema)