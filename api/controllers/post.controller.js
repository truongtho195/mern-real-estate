import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import PostDetail from '../models/postdetail.model.js';
import SavedPost from '../models/savedPost.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "./../utils/error.js"

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getPosts = async (req, res) => {
    const { city, type, property, bedroom, minPrice, maxPrice, sortBy, order } = req.query;
    let query = {};
    try {
        // if(name){
        //     query.name = {$regex: name, $options: "i"};// Tìm kiếm tên sản phẩm không phân biệt chữ hoa chữ thường
        // }

        if (city) {
            query.city = city;
        }
        if (type) {
            query.type = type;
        }
        if (property) {
            query.property = property;
        }
        if (bedroom) {
            query.bedroom = bedroom;
        }
        if (minPrice && maxPrice) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice) {
            query.price = { $gte: minPrice };
        } else if (maxPrice) {
            query.price = { $lte: maxPrice };
        }
        let sortQuery = {};
        if (sortBy) {
            sortQuery[sortBy] = order === 'desc' ? -1 : 1; // -1: giảm dần, 1: tăng dần
        }

        const posts = await Post.find(query).sort(sortQuery)
            .populate('postDetail')
            .populate({
                path: 'user',
                select: '-_id -password -createdAt -updatedAt'
            }).lean();


        setTimeout(() => {
            res.status(200).json(posts);
        }, 3000);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get POSTs!" })
    }
}

/***
 * 
 */
export const getPost = async (req, res) => {
    try {

        const postId = req.params.id;
        if (!postId) return next(errorHandler(403, "Post Id is required"));
        const post = await Post.findById(postId)
            .populate('postDetail')
            .populate({
                path: 'user',
                select: '-_id -password -createdAt -updatedAt'
            }).lean();

        //check post is saved?
        const token = req.cookies?.access_token;
        
        if(token){
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
                console.log(err)
                if(!err){                   
                    const saved = false
                    const postSaved = await SavedPost.findOne({
                        user:payload.id,
                        post:postId});
                    res.status(200).json({...post,isSaved : postSaved?true:false});
                }

            });

        }else{
            res.status(200).json({...post,isSaved :false});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get user!" })
    }
}
/***
 * 
 */
export const addPost = async (req, res, next) => {
    try {


        const tokenUserId = req.userId;
        const body = req.body;
        console.log(`tokenUserId:${tokenUserId}`)

        const postDetail = new PostDetail({ ...body.postDetail });
        await postDetail.save();

        const newPost = new Post({
            ...body.postData,
            postDetail: postDetail._id,
            user: tokenUserId
        })

        await newPost.save();

        // const { password, ...others } = newPost._doc;
        res.status(200).json(newPost);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to Create Post!" })
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const updatePost = async (req, res, next) => {
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const deletePost = async (req, res, next) => {
    try {

        const postId = req.params.id;
        const tokenUserId = req.userId;

        const post = await Post.findById(postId);
        console.log(post.user._id);

        if (tokenUserId !== post.user._id.toString()) {
            return next(errorHandler(403, "Not authorized!"));
        }

        await Post.findByIdAndDelete(post.id)
        res.status(200).json({ message: "Delete Post Success" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to Update user!" })
    }
}