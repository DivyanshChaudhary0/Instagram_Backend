
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    media: {
        type: Object,
        required: [true, "media is required"]
    },
    caption: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},{timestamps:true})


postSchema.statics.authorPosts = async function(user_Id){
    if(!user_Id) throw new Error("authorId is required");
    const posts = await this.find({user: user_Id})
    return posts
}

const postModel = mongoose.model("post",postSchema)
export default postModel