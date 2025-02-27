
import { Router } from "express";
import upload from "../utils/multer.js";
import { createPostController } from "../controllers/post.controller.js"
import { userAuth } from "../middlewares/user.middleware.js";
const router = Router();

router.post("/create", userAuth, upload.single("image"), createPostController)


export default router;