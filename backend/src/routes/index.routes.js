
import { Router } from "express";
import {feedController} from "../controllers/index.controller.js"
import { userAuth } from "../middlewares/user.middleware.js";
const router = Router();

router.get("/feed", userAuth, feedController)

export default router