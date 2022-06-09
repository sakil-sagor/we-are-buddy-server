const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");



const accessChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");
    isChat = await User.populate(isChat, {
        path: "latestMessage",
        select: "name picture email"
    })

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }
    }

    try {
        const createChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
            "users",
            "-password"
        )
        res.status(200).send(fullChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
});

const fetchChat = expressAsyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-passwrod")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then()



    } catch (error) {
        console.log(error);
    }
})

module.exports = { accessChat, fetchChat }