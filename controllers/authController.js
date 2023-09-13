const mongoose = require("mongoose");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const signup_get = asyncHandler( async(req, res) => {
    res.render("sign-up-form")
});

module.exports = signup_get;