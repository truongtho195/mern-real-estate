import express from "express"
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "./../middleware/verifyToken.js";
const router = express.Router();

router.get("/",getUsers)
router.get("/:id",verifyToken,getUserById)
router.put("/:id",verifyToken,updateUser)
router.delete("/:id",verifyToken,deleteUser)

export default router;