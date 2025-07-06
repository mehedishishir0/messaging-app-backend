const Conversation = require('../models/conversationModle');
const Message = require('../models/messageModel');

exports.sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const recevierId = req.params.id;
        const { message } = req.body;
        let gotConversation = await Conversation.findOne({
            perticipants: {
                $all: [senderId, recevierId]
            }
        });
        if (!gotConversation) {
            gotConversation = await Conversation.create({
                perticipants: [senderId, recevierId],
            });
        };
        const newMessage = await Message.create({
            senderId: senderId,
            recevierId: recevierId,
            message: message,
        })
        if (newMessage) {
            gotConversation.message.push(newMessage._id);
        }
        await gotConversation.save();

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage,
        });
    } catch (error) {
        console.log(error)
    }
}

exports.getMessages = async (req, res) => {
    try {
        const recevierId = req.params.id;
        const senderId = req.id;
        const getCOnversation = await Conversation.findOne({
            perticipants: { $all: [senderId, recevierId] }
        }).populate("message")
        if (!getCOnversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data: getCOnversation.message
        })

    } catch (error) {

    }
}