import dotenv from "dotenv"
import connectdb from "./db/index.js" 
import {app} from "./app.js"

dotenv.config({
    path: './.env'
})

connectdb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
// .then(()=>{
//    app.listen(process.env.PORT || 8000,()=>{
//     console.log(`server is running on PORT ${process.env.PORT}`);
//    })
// })
// .catch((error)=>{
//       console.log("mongo db connection faild !!!",error);
// })







































/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/