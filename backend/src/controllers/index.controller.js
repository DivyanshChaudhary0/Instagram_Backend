import postModel from "../models/post.model.js"

export const feedController = async function(req,res){
    try{
        const posts = await postModel.find();
        res.status(200).json({
            posts
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}