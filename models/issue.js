const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        reqired: true
    },
    imageUrl:{
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: Number,
        default: 0

    },
    dislikes: {
        type: Number,
        default: 0
    },
    likers: {
        type: Array
    },
    dislikers: {
        type: Array
    }
})
   




module.exports = mongoose.model("Issue", issueSchema); 