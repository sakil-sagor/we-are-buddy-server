const express = require("express");
const { accessChat, fetchChat } = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
// router.route("/group").post(protect, createGroup);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

module.exports = router;