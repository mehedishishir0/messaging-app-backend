const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://iconarchive.com/download/i107272/Flat-UI-Icons/User-Interface/user.ico",
    },
    gender:{
        type:String,
        enum:["Male","female","other"],
        default:"other",
        required:true,
    },
},{timestamps:true})

module.exports = mongoose.model("User", UserSchema);