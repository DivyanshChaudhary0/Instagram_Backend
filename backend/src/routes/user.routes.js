
import express from "express";
import {registerValidator,loginValidator} from "../middlewares/user.middleware.js"
import {registerController,loginController} from "../controllers/user.controller.js"
const router = express.Router();

router.post("/register", registerValidator, registerController)
router.post("/login", loginValidator, loginController)

export default router;