import mongoose from "mongoose";
import PostDetail from "./postdetail.model.js";
import User from './user.model.js';
import { TypeEnum, PropertyEnum } from "./enums.js";
// import AutoIncrementFactory from 'mongoose-sequence';
// // Tạo AutoIncrement instance
// const AutoIncrement = AutoIncrementFactory(mongoose);
const postSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    images: {
        type: [String],
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    bedroom: {
        type: Number
    },
    bathroom: {
        type: Number
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    type: {
        type: String,
        enum: Object.values(TypeEnum),
        default: TypeEnum.BUY,
    },
    property: {
        type: String,
        enum: Object.values(PropertyEnum),
        default: PropertyEnum.APARTMENT
    },
    postDetail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PostDetail',
        required:true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {
    // _id: false,
});

// Áp dụng plugin auto-increment cho trường customId
// postSchema.plugin(AutoIncrement, { inc_field: 'post, id: });
const Post = mongoose.model('Post', postSchema);
export default Post;