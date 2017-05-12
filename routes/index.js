var express = require('express');
var router = express.Router();

const mongoose = require('mongoose'),
  url = 'mongodb://admin:admin@ds139791.mlab.com:39791/bilbokning';

mongoose.connect(url);

mongoose.connection.on('connected', () => {
  console.log("Connected to database");
})

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {
    title: 'Express'
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
