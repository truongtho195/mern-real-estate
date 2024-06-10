import User from '../models/user.model.js'
import SavedPost from '../models/savedPost.model.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "./../utils/error.js"
import Chat from '../models/chat.model.js'
import Message from '../models/message.model.js'


export const getChats = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const chats = await Chat.find({users:
        {
            $in:[tokenUserId]
        }}).lean();
        // //tạo một tập hợp tất cả các users cần truy vấn
        // const userIds =[];
        // for (const chat of chats) {
        //     const receivedId = chat.users.find((id)=> id!==tokenUserId);
        //     if(receivedId){
        //         userIds.push(receivedId);
        //     }
        // }

        // //Truy vấn tất cả các usersIds một lần
        // const users = await User.find({_id:{$in:userIds}}).select('_id username avatar');  
        // const userMap ={};
        // for (const user of users) {
        //     userMap[user._id] = user;
        // }
        for (let chat of chats) {
            const receivedId = chat.users.find((id)=> id!==tokenUserId);   
            const receiver = await User.findOne({_id :receivedId}).select('_id username avatar');
            chat.receiver = receiver;
        }
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get chats!" })
    }
}

export const getChat = async (req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.id;
    console.log(`user : ${tokenUserId}`)
    console.log(`chat : ${chatId}`)
    try {
        const chat = await Chat.findOne({
            _id : chatId,
            users: {$in:[tokenUserId]}
        }).populate({
            path:'messages'

        });
        //Update seen
        
        const updateChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $set: {
                    seenBy:[tokenUserId]
                },
            },
            {
                new: true
            });
            
        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get chats!" })
    }
}

export const addChat = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const newChat = Chat({
            users:[tokenUserId,req.body.receiverId]
        }) 
        await newChat.save();
        res.status(200).json(newChat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get chats!" })
    }
}

export const readChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chat = await Chat.findByIdAndUpdate(
            {
                id:req.params.id,
                users :{$in:[tokenUserId]}
            },
            {
                $set: {
                    seenBy:[tokenUserId]
                },
            },
            {
                new: true
            });

        res.status(200).json(chat);
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: "Failed to get chats!" })
    }
}