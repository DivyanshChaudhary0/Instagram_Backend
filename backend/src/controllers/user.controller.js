
import {validationResult} from "express-validator"
import {createUser,loginUser} from "../services/user.service.js"

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

        const token = await user.generateToken();

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
        const token = await user.generateToken();

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
