let express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next){
  res.render('index', {
    title: 'Bilbokningen - logga in',
    testData: [10,20,30,40]
  });
});


router.get('/signup', function (req, res, next){
  res.render('signup', {
    //
  });
});

module.exports = router;
