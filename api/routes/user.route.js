import express from "express"
import { 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser, 
    savedPost,
    profilePosts,
    getNotificationNumber } from "../controllers/user.controller.js";
import { verifyToken } from "./../middleware/verifyToken.js";
import upload from "./../middleware/upload.js";
const router = express.Router();

router.get("/",getUsers)
// router.get("/:id/user",verifyToken,getUserById)
router.put("/:id",[verifyToken,upload.single('avatar')],updateUser)
router.delete("/:id",deleteUser)
router.post("/save",[verifyToken],savedPost)
router.get("/profilePosts",verifyToken,profilePosts)
router.get("/notification",verifyToken,getNotificationNumber)

export default router;