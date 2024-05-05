import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app=express();
//core is use because The word CORS stands for 
// “Cross-Origin Resource Sharing”. Cross-Origin Resource Sharing is an 
// HTTP-header based mechanism implemented by the browser which allows a server or an 
// API(Application Programming Interface) to indicate any origins
//  (different in terms of protocol, hostname, or port)
//  other than its origin from which the unknown origin gets permission 
//  to access and load resources. The cors package available in the npm registry
//   is used to tackle CORS errors in a Node.js application. 
app.use(cors({
    origin:process.env.CORE_ORIGIN,
    Credential:true
}))
// express.json() is a built in middleware function in Express starting from v4.16.0. 
// It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extends:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())




//router import 

import userRouter from "./routes/user.router.js"

//routes declaration
app.use("/api/v1/users",userRouter)

//htpp://localhost:8000/api/v1/user/register

export { app }