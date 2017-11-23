var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatResultSchema = new Schema({
    name: String
    ,
    timestamp: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      }
}
, {strict: false}
);

var CatResult = mongoose.model('CatResult', CatResultSchema );

module.exports = mongoose.model('CatResult', CatResultSchema );
