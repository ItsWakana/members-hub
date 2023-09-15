const mongoose = require("mongoose");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const LocalStrategy = require("passport-local").Strategy;
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const signup_get = asyncHandler( async(req, res) => {
    res.render("sign-up-form")
});

const signin_get = asyncHandler( async(req, res) => {
    res.render("sign-in-form");
});

const signup_post = [
 
    body("firstName", "First name must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("lastName", "Last name must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("username", "Username must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("password", "Password must not be empty")
        .trim()
        .isLength({ min: 5 })
        .escape(),
    body("passwordConfirm")
        .custom((value, { req }) => {
            return value === req.body.password;
        }),
    
    asyncHandler( async (req, res) => {
        const errors = validationResult(req);

        const {
            firstName,
            lastName,
            username,
            password
        } = req.body;

        if (!errors.isEmpty()) {
            res.render("sign-up-form", {
                firstName,
                lastName,
                username
            });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                firstName,
                lastName,
                accountCreatedAt: new Date(),
                username,
                password: hashedPassword,
                hasMemberStatus: false
            });
            await user.save();
            res.redirect("/");
            
        } catch(err) {
            console.log(err);
        }
    })
]

const signinAuthStrategy = new LocalStrategy(async (username, password, done) => {

    try {
        const user = await User.findOne({ username: username });
        
        if (!user) {
            return done(null, false);
        }

        const passComparison = await bcrypt.compare(password, user.password);

        if (!passComparison) {
            return done(null, false);
        } 
        return done(null, user);

    } catch(err) {
        console.log(err);
    }
});

const passcode_get = asyncHandler( async(req, res) => {
    res.render("passcode", {
        user: req.user || null
    });
});

const passcode_post = [
    body("passcode")
        .trim()
        .isLength({ min: 5 }),
    
    asyncHandler( async(req, res) => {
        const errors = validationResult(req);

        const { passcode: userEnteredPass } = req.body;

        if (!errors.isEmpty()) {
            res.redirect("/passcode");
        }

        if (!req.user) {
            res.redirect("/sign-in");
        }

        const { passcode } = await Admin.findOne();

        const match = await bcrypt.compare(userEnteredPass, passcode);

        if (match) {
            await User.findByIdAndUpdate(req.user._id, {
                hasMemberStatus: true
            });
            res.redirect("/");
        }
        
        res.redirect("/passcode");
    })
]

module.exports = {
    signup_get,
    signup_post,
    signin_get,
    signinAuthStrategy,
    passcode_get,
    passcode_post
};