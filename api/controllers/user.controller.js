import User from '../models/user.model.js'
import SavedPost from '../models/savedPost.model.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "./../utils/error.js"
import Post from '../models/post.model.js';
export const getUsers = async (req, res) => {
    try {
        // const excludeFields = ['password', 'createdAt', 'updatedAt'];
        // const selectString = excludeFields.map(field => `-${field}`).join(' ');

        // const users = await User.find().select(selectString);;
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: "Failed to get user!" })
    }
}
/*

*/
export const updateUser = async (req, res, next) => {
    try {

        const userId = req.params.id;
        const tokenUserId = req.userId;

        if (tokenUserId !== userId) {
            return next(errorHandler(403, "Not authorized!"));
        }
        let updateData = {
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar

        }
        const { avatar } = req.body;

        let updatedPassword = null;
        if (req.body.password) {
            updatedPassword = bcrypt.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    ...updateData,
                    ...(updatedPassword && { password: updatedPassword }),
                    ...(avatar && { avatar })
                },
            },
            {
                new: true
            });
        const { password, ...others } = updateUser._doc;
        res.status(200).json(others);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to Update user!" })
    }
}

/*

*/
export const getUserById = async (req, res,next) => {
    try {
        const userId = req.params.id;
        const tokenUserId = req.userId
        console.log(`userId : ${userId} || tokenUserId : ${tokenUserId}`);
        if (tokenUserId !== userId) {
            return next(errorHandler(403, "Not authorized!"));
        }
        const user = await User.findById(userId)
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get user!" })
    }
}

/*

*/
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const tokenUserId = req.userId

        if (tokenUserId !== userId) {
            return next(errorHandler(403, "Not authorized!"));
        }
        const result = await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "Delete Success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete user!" })
    }
}



export const savedPost = async (req, res) => {
    try {
        const postId = req.body.postId;
        const userId = req.userId
        console.log(`Save POST => Post Id :${postId} | userId : ${userId}` )
        // if (tokenUserId !== userId) {
        //     return next(errorHandler(403, "Not authorized!"));
        // }
        // const savedPost =await  SavedPost.findOne({Post : postId, User :userId}).exec();
        // if(savedPost)
        

        const postSaved = await SavedPost.findOneAndDelete({ post: postId, user: userId });
        if (postSaved) {
            console.log('Delete old post saved')
            console.log(postSaved);
            res.status(200).json({ message: "Post remove from list" })
        }else{
            const newSavedPost = SavedPost({ post: postId, user: userId });
            await newSavedPost.save();
            res.status(200).json({ message: "Post saved list" })
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to savePost" })
    }
}

export const profilePosts = async(req,res,next)=>{
    const tokenUserId = req.userId
    try {
        const userPosts = await Post.find({user : tokenUserId});
        const saved = await SavedPost.find({user:tokenUserId}).populate('post');
        const savedPost = saved.map(item=>item.post);
        res.status(200).json({userPosts,savedPost});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get profile posts!!"})
    }
}