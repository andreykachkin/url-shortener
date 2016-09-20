var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = require('../models/counter').Counter;
var config =require('../configBD');
var base58 = require('../base58');


var urlSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
        index: true
    },
    author:{
        type: String,
        required: true
    },
    url_long: {
        type: String,
        required: true
    },
    url_short: {
        type: String
    },
    counter: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String
    },
    tags: {
        type: Array
    }
});

urlSchema.pre('save', function(next){
    var doc = this;
    Counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {sequence: 1} }, function(err, counter) {
        if (err) return next(err);
        doc._id = counter.sequence;
        doc.url_short = config.webhost + base58.encode(doc._id);
        next();
    });
});

exports.Url = mongoose.model('Url', urlSchema);
