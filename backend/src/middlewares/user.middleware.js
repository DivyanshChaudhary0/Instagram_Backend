
import { body } from "express-validator";
import redis from "../services/redis.service.js";
import userModel from "../models/userModel.js";

export const registerValidator = [
    body("username")
        .trim()
        .custom((value)=> value === value.toLowerCase()).withMessage("username is in lowercase")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 16 }).withMessage("Username must be 3-16 characters long")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    body("photoUrl")
        .optional()
        .isURL().withMessage("Invalid photo URL format"),
]

export const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
]

export const userAuth = async function(req,res,next){
    try{
        const token = req?.cookies?.token || req.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({ message: "unauthorized" })
        }

        const isblackListed = await redis.get(`blacklist:${token}`)

        if(isblackListed){
            return res.status(401).json({ message: "unauthorized blaklisted token" })
        }
        
        const decoded = userModel.verifyToken(token);
        
        let user = await redis.get(`user:${decoded._id}`);
        user = JSON.parse(user)

        if(!user){
            user = await userModel.findById(decoded._id);
            if(user){
                delete user._doc.password;
                await redis.set(`user:${decoded._id}`, JSON.stringify(user))
            }
            else{
                return res.status(401).json({ message: "unauthorized" })
            }
        }

        req.tokenData = { token,...decoded }
        req.user = user;
        return next();
    }
    catch(err){
        res.status(401).json({ message: "unauthorized", error: err.message })
    }
}