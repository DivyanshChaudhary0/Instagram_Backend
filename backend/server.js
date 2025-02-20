
import app from "./src/app.js"
import config from "./src/config/config.js";
import connect from "./src/db/db.js";

connect();

const PORT = config.PORT || 3000

app.listen(PORT,function(){
    console.log("app is running on port " + PORT);
    
})