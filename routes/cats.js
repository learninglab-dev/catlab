var express = require('express');
var router = express.Router();
var CatModel = require('../models/cats');
var CatResult = require('../models/cat_results');

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
  var ts = new Date().getTime();
  console.log("in the get request and just shipped this ts:" + ts);
  var rollResult = Math.floor((Math.random() * catMechanics.length));
  CatResult.find({}, function (err, cats){

    if (err) return handleError(err);
    console.log("there are a total of " + cats.length + " responses.");
    var sums = {}, counts = {}, responseTimes=[], results = [];
    for (var i = 0; i < cats.length; i++) {
      // console.log("cat result is " + JSON.stringify(cats[i], null, 4));
      // console.log("response time is " + cats[i].responseTime);
      var name = cats[i].name;
      if (!(name in sums)) {
        console.log("name (" + name + ") isn't in sums:" + JSON.stringify(sums, null, 4));
      }
      if (!(name in sums)) {
        sums[name] = 0;
        counts[name] = 0;
        responseTimes[name] = 0;
      }
      sums[name] += cats[i].rating;
      counts[name]++;
      responseTimes[name]+=cats[i].responseTime;
    }
    for(name in sums){
      results.push({name: name, rating: (sums[name]/counts[name]), responseT: (responseTimes[name]/counts[name]), hits: counts[name]})
    }

    console.log(JSON.stringify(results, null, 8));
    // return results;
    res.render('cats', { title: catMechanics[rollResult].name, catId: rollResult, imageUrl: catMechanics[rollResult].imageUrl, rationale: catMechanics[rollResult].rationale, ts: ts, catList: results });
  });

});

router.post('/catvote', function(req, res, next){
  console.log(req.body);
  var postTs = new Date().getTime();
  console.log("the postTs is " + postTs);
  var newResult = new CatResult({name: catMechanics[req.body.catId].name
    , rating: req.body.points, loadTs: (req.body.loadTs), postTs: postTs});
  newResult.save((err)=> {console.log("saved result:\n" + JSON.stringify(newResult, null, 5))});
  res.redirect('/cats');
});

module.exports = router;
