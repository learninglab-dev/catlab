var express = require('express');
var router = express.Router();
var CatModel = require('../models/cats');
var CatResultSchema = require('../models/cat_results');

var catMechanics = [
    {name: 'Wiggle Cat', imageUrl: '/images/cat1.gif', rationale: "When you see your best friend on the other side of the classroom."},
    {name: 'WTF Cat', imageUrl: 'images/cat2.gif', rationale: "What. Are. You. Doing."},
    {name: 'Keyboard Cat', imageUrl: 'images/cat3.gif', rationale: "What's better than a person who plays piano? A cat that plays piano."},
    {name: 'Flower Cat', imageUrl:'/images/cat4.gif', rationale: "When someone compliments you and you don't know how to respond."},
    {name: 'Party Cat', imageUrl:'/images/cat5.gif', rationale: 'When your friend is ready to party but you just want to sleep.'},
    {name: 'Typing Cat', imageUrl:'/images/giphy.gif', rationale: "When you have a 10 page paper due in 3 hours and you just started 7 minutes ago."},
    {name: 'Stealing Cat', imageUrl:'/images/cat6.gif', rationale: 'When you get paid but have to pay your rent.'}
  ];

/* GET home page. */
router.get('/', function(req, res, next) {
  // var date = new Date();
  var rollResult = Math.floor((Math.random() * catMechanics.length));
  console.log("we rolled and got " + rollResult);
  console.log("this happened at " + Date.now());
  var newResult = new CatResultSchema({name: catMechanics[rollResult].name
    , first_timestamp: Date.now()
  });
  console.log(JSON.stringify(newResult, null, 4));
  newResult.save((err)=> {console.log("saved result")});
  res.render('cats', { title: catMechanics[rollResult].name, imageUrl: catMechanics[rollResult].imageUrl, rationale: catMechanics[rollResult].rationale });
});

module.exports = router;
