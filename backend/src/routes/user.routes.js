
import express from "express";
import {registerValidator,loginValidator,userAuth} from "../middlewares/user.middleware.js"
import {registerController, loginController, profileController, logoutController} from "../controllers/user.controller.js"
const router = express.Router();

router.post("/register", registerValidator, registerController)
router.post("/login", loginValidator, loginController)
router.get("/profile", userAuth, profileController)
router.get("/logout", userAuth, logoutController)

export default router;