import dotenv from "dotenv"
import express from "express"
const app=express();
import connectdb from "./db/index.js" 
dotenv.config({
    path: './.env'
})

connectdb()
const port=process.env.PORT ||3000
// .then(()=>{
//    app.listen(process.env.PORT || 8000,()=>{
//     console.log(`server is running on PORT ${process.env.PORT}`);
//    })
// })
// .catch((error)=>{
//       console.log("mongo db connection faild !!!",error);
// })
app.listen(port,()=>{
    console.log(`app listen on ${port}`);
});






































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