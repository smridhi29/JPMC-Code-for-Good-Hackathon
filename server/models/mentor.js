const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('Mentor', MentorSchema);