
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export default upload

// import path from "path"
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         console.log(file,req);
//         cb(null, path.join(__dirname, "..", ".." ,"public"))    
//     },
//     filename: function(req,file,cb){
//         cb(null, Math.floor(Math.random()*10000).toString(36) + path.extname(file.originalname))
//     }
// })

// const upload = multer({ storage: storage})
// export default upload
