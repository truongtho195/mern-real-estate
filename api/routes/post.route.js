import express from "express"
import { verifyToken } from "./../middleware/verifyToken.js";
import {addPost,updatePost,deletePost,getPosts,getPost} from "./../controllers/post.controller.js"
const router = express.Router();

// router.get("/test",(req,res)=>{
//     res.send("It's working")
// })
router.get("/",getPosts);
router.get("/:id",getPost);
router.post("/",verifyToken, addPost);
router.put("/:id",verifyToken,updatePost);
router.delete("/:id",verifyToken,deletePost);



export default router;