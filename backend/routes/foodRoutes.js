import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();
// using this routes we can create get post mentods 

//image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})// this id disk storage configuration


const upload = multer({storage:storage}) 
// using this image will be stored in uploades folder
// in this storage configuration we have used this diskstorage configuration above  
// store image using multar package

foodRouter.post("/add",upload.single("image"),addFood)
// here on this post mentod we have an endpoint /add where we have this middleware to upload the image  that we have created using th multer package

foodRouter.get("/list",listFood)

foodRouter.post("/remove", removeFood)


export default foodRouter