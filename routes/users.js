var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // need to respond with list drawn from DB
  res.render('index', { title: 'Users', tabTitle: 'Users', users: users });
});

router.get('/:user', function(req, res, next) {
  res.send(JSON.stringify(req.params))
});


module.exports = router;
