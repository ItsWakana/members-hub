const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    accountCreatedAt: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Messages: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Message'
    }],
    hasMemeberStatus: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("User", UserSchema);