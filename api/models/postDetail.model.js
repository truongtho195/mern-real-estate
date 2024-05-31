import mongoose from "mongoose";
// import { TypeEnum, PropertyEnum } from "./enums.js";
const postDetailSchema = new mongoose.Schema({
    desc: {
        type: String,
    },
    utilities: {
        type: String,   
    },
    pet: {
        type: String,
    },
    income: {
        type: String,
    },
    size: {
        type: Number,
    },
    school: {
        type: Number
    },
    bus: {
        type: Number
    },
    restaurant: {
        type: Number,
    }


}, {
    // _id: false,
});


const PostDetail = mongoose.model('PostDetail', postDetailSchema);
export default PostDetail;