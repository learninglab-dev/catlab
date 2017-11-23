var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MechanicResultSchema = new Schema({
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

var MechanicResult = mongoose.model('MechanicResult', MechanicResultSchema );

module.exports = mongoose.model('MechanicResult', MechanicResultSchema );
