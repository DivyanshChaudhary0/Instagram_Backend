
import {validationResult} from "express-validator"
import {createUser,loginUser} from "../services/user.service.js"
import redis from "../services/redis.service.js"
import postModel from "../models/post.model.js"

export const registerController = async function(req,res){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            message: errors.array()
        })
    }

    try{
        const {username,name,email,password} = req.body;

        const user = await createUser({username,name,email,password})

        delete user._doc.password

        const token = user.generateToken();

        res.status(201).json({
            message: "user created",
            user,
            token
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

export const loginController = async function(req,res){
    try{
        const {email,password} = req.body;
        const user = await loginUser({email,password})
        delete user._doc.password;
        const token = user.generateToken();

        res.status(200).json({
            message: "login success",
            user,
            token
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

export const profileController = async function(req,res){
    try{
        const user = req.user;
        const userPosts = await postModel.authorPosts(req.user._id)
        res.status(200).json({
            user,
            posts: userPosts
        })
    }
    catch(err){
        res.status(400).json({ message: err.message })
    }
}

export const logoutController = async function(req,res){
    try{
        const timeRemainingForToken = req.tokenData.exp * 1000 - Date.now();
        await redis.set(`blacklist:${req.tokenData.token}`, true, "EX", Math.floor(timeRemainingForToken/1000))
        res.send("logout")
    }
    catch(err){
        res.status(400).json({ message: err.message })
    }
}