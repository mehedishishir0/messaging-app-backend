const { model, Schema } = require('mongoose');


const MessageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recevierId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = model("Message", MessageSchema);