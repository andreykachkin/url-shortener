var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = Schema({
    _id: {
        type: String,
        required: true
    },
    sequence: {
        type: Number,
        default: 0
    }
});

exports.Counter = mongoose.model('Counter', counterSchema);