const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400)
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }
    console.log(newMessage);

    try {

        var message = await Message.create(newMessage);
        message = await message.populate("sender", "name", "picture");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name picture email"
        });
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }


})

module.exports = { sendMessage };