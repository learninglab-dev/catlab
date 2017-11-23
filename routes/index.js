var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var theListOfLinks=[{title: "Game Mechanic Generator", link: "/mechanics"}, {title: "Phil's original demo", link: "/phil"}, {title: "Cat Gifs!", link: "/cats"}]
  res.render('games', { title: 'gameLab', list: theListOfLinks, listTitle: "List of Games" });
});

module.exports = router;
