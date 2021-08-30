const mongoose = require('mongoose');
const User = require('./user.model')
const moment = require('moment');

const postSchema = mongoose.Schema({
    text: {type: String, required: false},
    photo: {type: String, required: false},
    date: {type: String, default: ()=>moment().format("DD/MM/YY HH:mm")},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: [{}],
    likes: [String],
});



module.exports = mongoose.model('Post', postSchema)