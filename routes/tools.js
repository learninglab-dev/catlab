var express = require('express');
var router = express.Router();
var slackOutput = require('../data/slackOutput');
var cp = require ('child_process');
var io2s = require ('../scripts/io2s').singleIo2s;

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

router.post('/io2s', function(req, res, next){

  console.log(req.body);
  console.log(process.env.SLACK_WEBHOOK_URL);
  // var thePayload = 'payload={"channel": "#ll-tests", "username": "theworkflow-bot", "text": "<@marlon>: just transcoded ' + path.basename(sourcePath) + ' and put it here: ' + destinationPath + ' .", "icon_emoji": ":desktop_computer:"}';
  // console.log(thePayload);
  // cp.spawnSync("curl", ['-X', 'POST', '--data-urlencode', thePayload, process.env.SLACK_WEBHOOK_URL]);

  var thePayload = 'payload={"channel": "#ll-tests", "username": "theworkflow-bot", "text": "<@marlon>: just got a message from Google Sheets: ' + JSON.stringify(req.body)+ ' -- does that seem right?", "icon_emoji": ":desktop_computer:"}';
  console.log(thePayload);
  cp.spawnSync("curl", ['-X', 'POST', '--data-urlencode', thePayload, process.env.SLACK_WEBHOOK_URL]);
  res.send("got it" + JSON.stringify(req.body));

  for (var i = 0; i < req.body.segments.length; i++) {
    console.log("we will export from " + req.body.segments[i].inHr + " to " + req.body.segments[i].outHr);

  }
  io2s(req.body.segments);
});



module.exports = router;
