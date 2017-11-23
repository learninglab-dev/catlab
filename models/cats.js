var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatSchema = new Schema({
    name: String,
    imageUrl: String,
    rationale: String
}
, {strict: false}
);

var Mechanic = mongoose.model('Cat', CatSchema );

module.exports = mongoose.model('Cat', CatSchema );
