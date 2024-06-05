import mongoose from "mongoose";
import User from './user.model.js'
import Post from './post.model.js'
const savedPostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
        
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        
    },
}, {
    // _id: false,
    timestamps:true
});

const SavedPost = mongoose.model('SavedPost', savedPostSchema);
export default SavedPost;