import User from '../models/user.model.js'
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import { errorHandler } from "./../utils/error.js"
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
export const updateUser = async (req, res,next) => {
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
        const {avatar} = req.body;
        
        let updatedPassword  =null;
        if (req.body.password) {
            updatedPassword = bcrypt.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    ...updateData,
                    ...(updatedPassword && {password:updatedPassword}),
                    ...(avatar &&  {avatar})
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
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const tokenUserId = req.userId

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
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "Delete Success" })
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete user!" })
    }
}