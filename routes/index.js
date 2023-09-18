const express = require("express");
const { 
  signup_get, 
  signup_post, 
  signin_get,
  passcode_get, 
  passcodeSet_post,
  passcode_post
} = require("../controllers/authController");
const { sendMessage_post, messageList_get } = require("../controllers/messageController");
const passport = require("passport");
const router = express.Router();

router.get("/", messageList_get);

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

router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

router.post("/send-message", sendMessage_post);

router.get("/messages", )

router.get("/passcode", passcode_get);

router.post("/passcode", passcode_post);

router.get("*", (req, res) => res.redirect("/"));

module.exports = router;