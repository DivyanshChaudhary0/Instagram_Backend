
import express from "express"
import cors from "cors"
const app = express();

import indexRoutes from "./routes/index.routes.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/", indexRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

export default app;