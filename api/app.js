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
const app = express();
configDotenv()
app.use(express.json());
app.use(cookieParser())

const port = process.env.PORT || 8800;
const hostname = process.env.HOST_NAME || "localhost";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({origin:process.env.CLIENT_URL,credentials :true}));
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);
app.use("/api/users",userRoute);
app.use("/api/chats",chatRoute);
app.use("/api/messages",messageRoute);
app.use("/test",testRoute);


// app.listen(8800,()=>{
//     console.log('Server is running at http://localhost:8800/');
// })

( async()=>{
    try {
        //test connection
        await Database.connect(process.env.DATABASE_URL);     
        app.listen(port,hostname,()=>{
            console.log(`Sever is running at http://${hostname}:${port}`)
        })
    } catch (error) {
        console.log ("Error Connect to DB :", error);
    }
})();