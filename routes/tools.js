var express = require('express');
var router = express.Router();
var slackOutput = require('../data/slackOutput');
var cp = require ('child_process');
var io2s = require ('../scripts/io2s').io2s;

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
  console.log("\n\ngot a request.\n\nreq.body:\n\n");
  console.log(req.body);
  var ts = new Date().getTime();
  var slackSummary = "";
  for (var i = 0; i < req.body.segments.length; i++) {
    var inText = "\nSegment " + (i+1) + ". From " + req.body.segments[i].inHr + ":" + req.body.segments[i].inMin + ":" + req.body.segments[i].inSec + ":" + req.body.segments[i].inFrame
    var outText = " to " + req.body.segments[i].outHr + ":" + req.body.segments[i].outMin + ":" + req.body.segments[i].outSec + ":" + req.body.segments[i].outFrame + ".  ";
    slackSummary += (inText + outText);
  }

  console.log(process.env.SLACK_WEBHOOK_URL);
  // var thePayload = 'payload={"channel": "#ll-tests", "username": "theworkflow-bot", "text": "<@marlon>: just transcoded ' + path.basename(sourcePath) + ' and put it here: ' + destinationPath + ' .", "icon_emoji": ":desktop_computer:"}';
  // console.log(thePayload);
  // cp.spawnSync("curl", ['-X', 'POST', '--data-urlencode', thePayload, process.env.SLACK_WEBHOOK_URL]);
  var thePayload = 'payload={"channel": "#ll-tests", "username": "theworkflow-bot", "text": "<@marlon>: just got a message from Google Sheets at ' + ts + ': ' + slackSummary + ' \n\n. . . does that seem right?", "icon_emoji": ":desktop_computer:"}';
  console.log("\n\nsending this to Slack:\n" + thePayload);
  cp.spawnSync("curl", ['-X', 'POST', '--data-urlencode', thePayload, process.env.SLACK_WEBHOOK_URL]);

  io2s(req.body.segments);
  res.send("got it" + JSON.stringify(req.body));
});



module.exports = router;
