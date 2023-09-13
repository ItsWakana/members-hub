const express = require("express");
const signup_get = require("../controllers/authController");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index');
});

router.get("/sign-up", signup_get);

module.exports = router;