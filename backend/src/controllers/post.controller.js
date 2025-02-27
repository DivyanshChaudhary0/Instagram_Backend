
import { generateCaption } from "../services/ai.service.js"
import postModel from "../models/post.model.js"
import { uploadOnCloudinary } from "../services/cloudinary.service.js"

export const createPostController = async function(req,res){
    try{
        const imageBuffer = req.file?.buffer
        
        if(!imageBuffer){
            return res.status(400).json({
                message: "Invalid image data"
            })
        }

        const [caption,fileData] = await Promise.all([
            generateCaption(imageBuffer),
            uploadOnCloudinary(imageBuffer)
        ])

        let post = await postModel.create({
            caption,
            media: fileData,
            user: req.user._id
        })
        
        // const caption = await generateCaption(imageBuffer)
        // const fileData = await uploadOnCloudinary(imageBuffer)

        post = await post.populate("user")

        res.status(200).json({
            post
        })
    }

    catch(err){
        res.status(400).json({ message: err.message })
    }
}
