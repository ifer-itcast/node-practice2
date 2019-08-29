const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Comment
};