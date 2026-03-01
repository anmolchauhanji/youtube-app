import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
import  upload from "../middleware/multer.middlewar.js"
const router = Router()

// router.route('/login').post(registerUser)
router.route('/register').post(upload.fields([
    {
        name:"avtar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
])
    ,registerUser
)



export default router