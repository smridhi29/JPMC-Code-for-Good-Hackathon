const mongoose = require('mongoose');

var WebinarSchema = mongoose.Schema({
    webinarname:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    webinarlink:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('webinars',WebinarSchema);