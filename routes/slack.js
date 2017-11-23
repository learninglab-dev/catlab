var express = require('express');
var router = express.Router();
const slack = require('slack');

function getDisplayName(userId) {
 for (var i = 0; i < usersOutput.members.length; i++) {
  if (usersOutput.members[i].id = userId) {
   return usersOutput.members[i].profile.display_name_normalized;
  }
 }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Slack Functions' });
});

// get a list of the users
router.get('/users', function(req, res, next) {
  slack.users.list({token: process.env.SLACK_TOKEN}, (err, data) => {
    console.log(JSON.stringify(data, null, 4));
      res.render('list_users', { title: 'Slack Users List', tabTitle: 'Slack Users List', list: data.members, listTitle: "users and ids"})
  });
});

// get a list of the channels
router.get('/channels', function(req, res, next) {
  slack.channels.list({token: process.env.SLACK_TOKEN}, (err, data) => {
    console.log(JSON.stringify(data, null, 4));
      res.render('list_channels', { title: 'Slack Channels List', tabTitle: 'Slack Channels List', list: data.channels, listTitle: "channels and ids"})
  });
});

// get a list of messages from a specified channel
router.get('/channels/:channel', function(req, res, next) {
  slack.channels.history({token: process.env.SLACK_TOKEN, channel: req.params.channel, count: 200}, (err, data) => {
      var sortedList = data.messages.sort(function(a,b){
            return (parseFloat(a.ts) - parseFloat(b.ts));
          });
      res.render('channel_history', { title: 'Channel History', tabTitle: 'Channel History', channel: req.params.channel, list: sortedList})
  });

});

module.exports = router;
