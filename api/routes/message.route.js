import express from "express"
import { addMessage,addMessageToChat} from "../controllers/message.controller.js";
import { verifyToken } from "./../middleware/verifyToken.js";
const router = express.Router();


router.post("/:chatId",verifyToken,addMessage)
// router.post("/login",login)
// router.post("/logout",logout)


export default router;