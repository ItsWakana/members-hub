const Message = require("../models/Message");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const sendMessage_post = [

    body("title")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body("message")
        .trim()
        .isLength({ min: 5 })
        .escape(),
    
    asyncHandler( async (req, res, next) => {

        const errors = validationResult(req);

        const {
            title,
            message
        } = req.body;

        const dbMessage = new Message({
            title: title,
            messageContent: message,
            createdAt: new Date(),
            author: req.user.id,
        })
        if (!errors.isEmpty()) {

            res.render("index", {
                messageTitle: title,
                message,
                user: req.user
            })
        } 

        try {
            await dbMessage.save();
    
            await User.findOneAndUpdate(
                { _id: req.user._id }, 
                { $push: { Messages: dbMessage._id } } 
            )
            res.redirect("/");
        } catch(err) {
            console.log(err);
        }
    })
]

const messageList_get = asyncHandler( async(req, res, next) => {

    //we only want to render the chat box when there actually is a user. 

    //otherwise just render the message history normally.

    const fetchedMessages = await Message.find({}).populate("author");

    res.render("index", {
        user: req.user,
        messages: fetchedMessages
    });
})

module.exports = {
    sendMessage_post,
    messageList_get
};