import User from '../models/user.model.js'
import SavedPost from '../models/savedPost.model.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "./../utils/error.js"
import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js'
import { login } from './auth.controller.js';
import mongoose from 'mongoose';

export const addMessage = async (req, res) => {
    try {
        const tokenUserId = req.userId;
        const chatId = req.params.chatId;

        const text = req.body.text;
        console.log(`TokenUserId:${tokenUserId} | ChatId:${chatId} | Text :${text}`);
        const chat = await Chat.findOne({
            _id: chatId,
            users: { $in: [tokenUserId] }
        });
        if (!chat) return res.status(404).json({ message: "Chat not found!" });

        const newMessage = Message({
            text,
            chatId: chatId,
            userId: tokenUserId
        });

        await newMessage.save();
        chat.messages.push(newMessage._id);
        chat.lastMessage = text;
        chat.save();
        
        // const updateChat = await Chat.findByIdAndUpdate(
        //     chatId,
        //     {
        //         $set: {
        //             messages: [newMessage],
        //             seenBy: [tokenUserId],
        //             lastMessage: text
        //         },
        //     },
        //     {
        //         new: true
        //     });

        res.status(200).json(newMessage);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add message!" })
    }
}

export const addMessageToChat = async (req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;

    const messageText = req.body.text;
    console.log(`TokenUserId:${tokenUserId} | ChatId:${chatId} | Text :${messageText}`);
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
        // Kiểm tra sự tồn tại của chatId và userId
        const chat = await Chat.findById(chatId); //.session(session);
        // const user = await User.findById(tokenUserId);//.session(session);

        if (!chat) {
            throw new Error('Chat not found');
        }

        // if (!user) {
        //     throw new Error('User not found');
        // }

        // Tạo tin nhắn mới
        const message = new Message({
            text: messageText,
            userId: tokenUserId,
            chatId: chatId
        });

        await message.save(); //{ session }

        // Cập nhật cuộc trò chuyện với tin nhắn mới
        chat.messages.push(message._id);
        chat.lastMessage = messageText;

        await chat.save();//{ session }

        // await session.commitTransaction();
        // session.endSession();
        res.status(200).json(message);
    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        console.error('Error add message to chat :', error);
        res.status(500).json({ message: "failed to add message" })

    }
}

