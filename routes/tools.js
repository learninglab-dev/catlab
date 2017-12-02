var express = require('express');
var router = express.Router();
var slackOutput = require('../data/slackOutput');


router.get('/', function(req, res, next) {
  var replies = [];
  for (var i = 0; i < slackOutput.messages.length; i++) {
    console.log(slackOutput.messages[i].user);
    if (slackOutput.messages[i].parent_user_id) {
      console.log("this message has a parent user id and it is " + slackOutput.messages[i].parent_user_id);
      replies.push(slackOutput.messages[i]);
    }
  }
  res.render('tools', { title: "Tool Page", slack: replies });
  // console.log(slackOutput);
});

module.exports = router;
