var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShootSchema = new Schema({
    shootId: String,
    fcpxml: String
    // data: Object;
}, {strict: false}
);


module.exports = mongoose.model('Shoot', ShootSchema );
