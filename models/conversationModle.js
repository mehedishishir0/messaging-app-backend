const mongoose = require('mongoose');


const ConversationSchema = new mongoose.Schema({
    perticipants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            required: true,
        }
    ]
})

module.exports = mongoose.model("Conversation", ConversationSchema);
