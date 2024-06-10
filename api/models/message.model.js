import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
