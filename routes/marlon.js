var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var rolls = [0,0,0,0];
  var scores = [0,0,0,0,0,0];
  var testarray = ['stuff','and','things'];
  for (j=0;j<=5;j++){
    for (i=0;i<=3;i++){
      rollresult = Math.floor((Math.random() * 6) + 1);
      rolls[i]=rollresult;
      console.log("Roll # "+(i+1)+" is: "+rollresult);
    }
    var top3 = rolls.sort((a,b)=>b-a).slice(0,3);
    console.log("Your top 3 rolls are: "+top3);
    var top3sum = top3.reduce((a,b)=>a+b,0);
    console.log("Your score is: "+top3sum);
    scores[j]=top3sum;
  };
  console.log("Your 6 ability scores are (descending order): "+scores.sort((a,b)=>b-a));
  res.render('marlon', { title: 'Marlon', newvar: 'xxyyzz', testarray, scores });

});


router.post('/posttest',function(req,res,next){
  res.send(req.body); /*this routes the user to their input aka req (and body is the interesting content bit)*/
  console.log(JSON.stringify(req.body)); /*this just logs the req back to the console as a string*/
});

/*helper function  for dnd rolls*/
// router.use('/',function Roll4Sumtop3(req, res, next){
//   for (j=0;j<=5;j++){
//     for (i=0;i<=3;i++){
//       rollresult = Math.floor((Math.random() * 6) + 1);
//       rolls[i]=rollresult;
//       console.log("Roll # "+(i+1)+" is: "+rollresult);
//     }
//     var top3 = rolls.sort((a,b)=>b-a).slice(0,3);
//     console.log("Your top 3 rolls are: "+top3);
//     var top3sum = top3.reduce((a,b)=>a+b,0);
//     console.log("Your score is: "+top3sum);
//     scores[j]=top3sum;
//   };
//   console.log("Your 6 ability scores are (descending order): "+scores.sort((a,b)=>b-a));
// });




module.exports = router;
