import express from "express"
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js"
import postRoute from "./routes/post.route.js"
import userRoute from "./routes/user.route.js"
import chatRoute from "./routes/chat.route.js"
import messageRoute from "./routes/message.route.js"
import testRoute from "./routes/test.route.js"
import Database from "./config/database.js"
import path from 'path';

import { fileURLToPath } from 'url';
import appConfig from "./config/appconfig.js";
const app = express();
configDotenv()
app.use(express.json());
app.use(cookieParser())


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({origin:process.env.CLIENT_URL,credentials :true}));
// Middleware để phục vụ các tệp tĩnh, client có thể truy cập dc vào thư mục upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);
app.use("/api/users",userRoute);
app.use("/api/chats",chatRoute);
app.use("/api/messages",messageRoute);
app.use("/test",testRoute);



( async()=>{
    try {
        //test connection
        await Database.connect(process.env.DATABASE_URL);     
        app.listen(appConfig.port,appConfig.hostname,()=>{
            console.log(`Sever is running at http://${appConfig.hostname}:${appConfig.port}`)
        })
    } catch (error) {
        console.log ("Error Connect to DB :", error);
    }
})();