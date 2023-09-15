const express = require("express");
const { messageList_get, messageDelete_post } = require("../controllers/messageController");
const router = express.Router();

router.get("/", messageList_get);

router.post("/:messageId/delete", messageDelete_post);

module.exports = router;