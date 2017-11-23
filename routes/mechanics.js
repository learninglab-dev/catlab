var express = require('express');
var router = express.Router();
var MechanicModel = require('../models/mechanics');
var MechanicResultSchema = require('../models/mechanics_results');

var gameMechanics = [
    {name: 'Scotland Yard', imageUrl: 'images/Scotlandyard2.jpg', rationale: "This game would be cool to use because it's about Scotland."},
    {name: 'Mah Jong', imageUrl: 'images/Mah-yongg_stones.jpg', rationale: "This game would be cool to use because it has tiles."},
    {name: 'Monopoly', imageUrl: 'images/monopoly.jpg', rationale: "Real estate is fun."},
    {name: 'Hopscotch', imageUrl:'/images/hopscotch.jpg', rationale: 'Jumping!'},
    {name: 'Bingo', imageUrl:'/images/bingo.jpg', rationale: 'A singular mix of surprise and monotony.'},
    {name: 'Poker', imageUrl:'/images/poker_01.jpg', rationale: 'Money.'},
    {name: 'Dice', imageUrl:'/images/dice_01.jpg', rationale: 'Tactile pleasure + randomization.'}
  ];

/* GET home page. */
router.get('/', function(req, res, next) {
  // var date = new Date();
  var rollResult = Math.floor((Math.random() * gameMechanics.length));
  console.log("we rolled and got " + rollResult);
  console.log("this happened at " + Date.now());
  var newResult = new MechanicResultSchema({name: gameMechanics[rollResult].name
    , first_timestamp: Date.now()
  });
  console.log(JSON.stringify(newResult, null, 4));
  newResult.save((err)=> {console.log("saved result")});
  res.render('mechanics', { title: gameMechanics[rollResult].name, imageUrl: gameMechanics[rollResult].imageUrl, rationale: gameMechanics[rollResult].rationale });
});

module.exports = router;
