let express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next){
  res.render('index', {
    title: 'Bilbokningen - logga in',
    testData: [10,20,30,40]
  });
});

router.get('/cars/car/:id', function (req, res, next) {

  const carID = req.params.id;
  console.log(`Detta id fick vi ${carID}`);

  res.render('index', {
    title: 'Express',
    carID: carID
  });
});

module.exports = router;
