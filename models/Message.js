const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    messageContent: {
        type: String,
        required: true
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    createdAt: {
        type: Date,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model("Message", MessageSchema);