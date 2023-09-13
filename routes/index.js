const express = require("express");
const { signup_get, signup_post } = require("../controllers/authController");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index');
});

router.post("/sign-up", signup_post);

router.get("/sign-up", signup_get);

module.exports = router;