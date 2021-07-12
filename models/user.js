const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        reqired: true
    }
,
    memberSince:{
        type: Date,
        default: Date.now 
    }

});

module.exports = mongoose.model("User", userSchema); 