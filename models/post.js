const mongoose = require('mongoose');

const PostModel = mongoose.model(
    "postmodel",
    {
        "author": {
            type: String,
            required: true
        },
        "message": {
            type: String,
            required: true
        },
        "date": {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    "post"
)

module.exports = PostModel;