const express = require("express");
const { signup_get, signup_post, signin_get } = require("../controllers/authController");
const passport = require("passport");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index', {
        user: req.user
    });
});

router.post("/sign-up", signup_post);

router.get("/sign-up", signup_get);

router.get("/sign-in", signin_get);

router.post(
    "/sign-in",
    passport.authenticate("local", {
        failureRedirect: "/sign-in",
        successRedirect: "/"
    })
)
module.exports = router;