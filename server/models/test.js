const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');

var TestSchema = mongoose.Schema({
    testname:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    testlink:{
        type:String,
        required:true
    },
    mentor:{
        type: String,
        // required: true        
    }
    
});

module.exports = mongoose.model('Tests',TestSchema)