import bcrypt from "bcrypt";
import User from '../models/user.model.js'

import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";
import { checkAvatarUrl } from '../lib/utils.js';
import appConfig from '../config/appconfig.js';
export const test = async (req, res) => {
    try {
        // // Kiểm tra kết nối bằng cách truy vấn một bảng/collectio nào đó
        // const users = await prisma.user.findMany();
        // console.log("Connected to MongoDB successfully!");
        // console.log("Users:", users);

        mongoose.connect(process.env.DATABASE_URL, {
        })
        .then(() => console.log('Connected to MongoDB'))
        .catch(error => console.error('Error connecting to MongoDB:', error));
        res.send("mongodb connect success")
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    } finally {
        // Đảm bảo đóng kết nối sau khi kiểm tra
    }
}


export const register = async (req, res,next) => {
    const { username, email, password } = req.body;
    //Hash The Password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    //Create a New User & Save to DB
    

    const newUser = new User({username:username,email:email,password:hashedPassword});
    try {       
        await newUser.save();
        res.status(201).json({message:`User create successfully`}) ;
    } catch (error) {
        // next(error);
        console.log(error)
        res.status(500).json({message:"Failed to create user!"})

    }

    console.log(newUser);
};

export const login = async(req, res,next) => {
    const { username, password } = req.body;
    try {
        //CHECK IF THE USER EXISTES
        const validUser = await User.findOne({username});

        if (!validUser) 
            return res.status(400).json({message:"User not found"});

        
        //CHECK IF THE PASSWORD IS CORRECT
        const isValidPass=await bcrypt.compare(password, validUser.password);
        if(!isValidPass)  
            return res.status(401).json({message:"Invalid Credentials"});

        //GENERATE COOKIE TOKEN AND SEND TO THE USER
        const token = jwt.sign({
                                id:validUser._id,
                                isAdmin:false},
                    process.env.JWT_SECRET_KEY);
        
        const {password:hashedPassword,createdAt,updatedAt,...rest} = validUser._doc;

        const expiredDate = new Date(Date.now()+36000000);
        console.log(`Expired Date : ${expiredDate}`)
        res.cookie("access_token",token,{httpOnly:true,expires:expiredDate})
                .status(200)
                .json({...rest,avatar:checkAvatarUrl(rest.avatar,appConfig.domain)});

    } catch (error) {
        // next(error);
        console.log(error);
        res.status(500).json({ message: "Failed to login!" });
    }
}

export const logout = (req, res) => {
    res.clearCookie('access_token').status(200).json({message:'Sign out success!'})
}
