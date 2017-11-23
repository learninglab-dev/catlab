var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MechanicSchema = new Schema({
    name: String,
    imageUrl: String,
    rationale: String
}
, {strict: false}
);

var Mechanic = mongoose.model('Mechanic', MechanicSchema );

module.exports = mongoose.model('Mechanic', MechanicSchema );
