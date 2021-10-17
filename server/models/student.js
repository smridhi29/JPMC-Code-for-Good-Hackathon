const mongoose = require('mongoose')

const MenteeSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mentor:{
        type: String
    }
});

module.exports = mongoose.model('Student',MenteeSchema);