let express = require('express');
let router = express.Router();


const Bookings = require("../models/bookings");
const Cars = require("../models/cars");

/* GET home page. */
router.get('/', function(req, res, next) {


  const { formError, authError } = req.query;
    res.render('index', {
        title: 'Car Rental Supreme - login',
        formError: formError,
        authError: authError,
    });
});


router.get('/signup', function(req, res, next) {

    const { formError } = req.query;
    res.render('signup', {
        formError: formError
    });
});


router.get('/reservation', function(req, res, next){

  Bookings.find({user_id: req.user._id})
    .select("-_id car_id")
    .exec((err, booking) => {

      const car_idArray = booking.map(obj => obj.car_id);
      Cars.find()
        .where('_id')
        .in(car_idArray)
        .exec((err, cars) => {
          console.log(cars);
          res.render('reservation',{ usersObj: cars});
        });
    })
});

module.exports = router;