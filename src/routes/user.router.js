import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import{upload} from "../middlewares/multter.middlwares.js"
const  router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage"
        }
    ]),
    registerUser)


export default router