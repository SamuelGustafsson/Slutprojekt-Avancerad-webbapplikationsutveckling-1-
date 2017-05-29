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

module.exports = router;