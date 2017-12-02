var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatResultSchema = new Schema({
    name: String,
    rating: Number,
    loadTs: Number,
    postTs: Number,
    // {
    //     type: Date,
    //     // `Date.now()` returns the current unix timestamp as a number
    //     default: Date.now
    //   }
}, {strict: false}
);

CatResultSchema.virtual('responseTime').get(function () {
  return (this.postTs - this.loadTs);
});

var CatResult = mongoose.model('CatResult', CatResultSchema );
module.exports = mongoose.model('CatResult', CatResultSchema );
