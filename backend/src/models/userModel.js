
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"username is required"],
        unique: [true,"username is already exist"],
        minLength: [3,"username must have 3 characters"],
        maxLength: [15,"username is between 3 to 15 characters"],
        match: [/^[a-zA-Z0-9_]{3,16}$/,"Invalid username format"]
    },
    name: {
        type: String,
        required: [true,"Name is required"],
        minLength: [3,"Name must have 3 characters"],
        maxLength: [15,"Name is between 3 to 15 characters"],
    },
    email: {
        type: String,
        required: [true,"email is required"],
        unique: [true,"email is already exist"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"]
    },
    password: {
        type: String
    },
    photoURL: {
        type: String,
        default: "https://imgs.search.brave.com/uLARhH16ug7xgUl3msl3yHs0DCWkofOAnLVeWQ-poy0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzI1Mi0y/NTI0Njk1X2R1bW15/LXByb2ZpbGUtaW1h/Z2UtanBnLWhkLXBu/Zy1kb3dubG9hZC5w/bmc"
    },
},{timestamps:true})

userSchema.statics.hashPassword = async function(password){
    if(!password){
        throw new Error("Invalid password")
    }
    return await bcrypt.hash(password,10)
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken = function(){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    },config.JWT_SECRET,{expiresIn: config.JWT_EXPIRY})
}

userSchema.statics.verifyToken = function(token){
    return jwt.verify(token,config.JWT_SECRET)
}


const userModel = mongoose.model("user",userSchema)
export default userModel
