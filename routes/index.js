let express = require('express');
let router = express.Router();

const Cars  = require("../models/cars");
const Users = require("../models/users");


/* GET home page. */
router.get('/', function (req, res, next){


  const {formError, authError} = req.query;
  res.render('index', {
    title: 'Car Rental Supreme - login',
    formError: formError,
    authError: authError,
  });
});


router.get('/signup', function (req, res, next){

  const {formError} = req.query;
  res.render('signup', {
    formError: formError
  });
});



/* dummy routes start */
router.get('/dummy/cars/insert', function (req, res, next){

  const json = require("../dummy-cars.json");
  Cars.create(json, (err, car) => {
    if (err) throw err;
    console.log("-- /dummy/cars/insert DONE --");
    res.redirect("/");
  });

});
router.get('/dummy/cars/delete', function (req, res, next){

  Cars.remove({},(err, car) => {
    if (err) throw err;
    console.log("-- /dummy/cars/delete DONE --");
    res.redirect("/");
  });

});

module.exports = router;
