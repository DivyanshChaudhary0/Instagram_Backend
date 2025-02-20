
import express from "express";
import {userValidator} from "../middlewares/user.middleware.js"
import {registerController} from "../controllers/user.controller.js"
const router = express.Router();

router.post("/register", userValidator, registerController)

export default router;