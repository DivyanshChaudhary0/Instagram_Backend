
import userModel from "../models/userModel.js"

export const createUser = async ({username,name,email,password})=>{
    if(!username || !email || !password){
        throw new Error("All fields are required")
    }
    const isUserExist = await userModel.findOne({
        $or: [{username},{email}]
    })

    if(isUserExist){
        throw new Error("User already exist")
    }

    const hashed = await userModel.hashPassword(password)

    const user = await userModel.create({
        username,
        name,
        email,
        password: hashed
    })

    return user;
}

export const loginUser = async ({email,password})=>{
    if(!email || !password){
        throw new Error("All fields are required")
    }

    const user = await userModel.findOne({email});
    if(!user){
        throw new Error("Invalid  email or password")
    }
    const isMatched = await user.comparePassword(password);
    if(!isMatched){
        throw new Error("Invalid  email or password")
    }
    return user;
}