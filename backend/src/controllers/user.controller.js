
import {validationResult} from "express-validator"

export const registerController = function(req,res){
    try{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: errors.array()
            })
        }

        res.status(201).json({
            message: "user created"
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}