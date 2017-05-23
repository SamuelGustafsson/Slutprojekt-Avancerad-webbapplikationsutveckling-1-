let express = require('express');
let router = express.Router();

const passport = require("passport");

const randomstring = require("randomstring");
const User = require("../models/users");

const Bookings = require("../models/bookings");
const Cars = require("../models/cars");






router.post('/login', passport.authenticate('local', { failureRedirect: "/?formError=true" }), (req, res) => {
    res.redirect('/cars');
});

router.post('/signup', (req, res) => {
    User.register(new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.username,
    }), req.body.password, (error, user) => {
        if (error) return res.send(error);
        res.redirect('/');
    });
});

/*
  middleware: redirect user IF one is NOT logged in
 (one is unable to access routes after this middleware!)
*/
router.use((req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect('/?authError=true');
});


router.get('/', function (req, res, next) {

    User.find((err, result) => {
        if (err) { console.log(err); }
        //res.send(200);
        res.render('users', {
            usersObj: result
        });
    });
});

router.get('/reservation', function (req, res, next){

  Bookings.aggregate([
      {
        $match: {
          user_id: req.user._id
        }
      },
      {
        $lookup: {
          from: "cars",
          localField: "car_id",
          foreignField: "_id",
          as: "carobj"
        }
      }
  ]).exec((err, usersObj) => {
    res.render('reservation', { usersObj });
  })

/*    Bookings.find({ user_id: req.user._id })
        .populate({
            path: 'car_id',
            model: 'Car'
        })
        .exec((err, usersObj) => {
            // console.info(usersObj);
            res.render('reservation', { usersObj });
        });*/

    // Bookings.find({ user_id: req.user._id })
    //     .select("-_id car_id date_to date_from")
    //     .exec((err, booking) => {
    //         console.info(booking);
    //         const car_idArray = booking.map(obj => obj.car_id);

    //         Cars.find()
    //             .where('_id')
    //             .in(car_idArray)
    //             .exec((err, cars) => {
    //                 console.log(cars);
    //                 res.render('reservation', { usersObj: cars });
    //             });
    //     })
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/insert', function (req, res, next) {
    /* ! does not insert a reg. user with a hashed password atm! */

    let firstname = randomstring.generate({
        length: 4,
        charset: 'alphabetic',
        capitalization: "lowercase"
    });

    let user = new User({
        firstname: firstname,
        lastname: randomstring.generate({
            length: 4,
            charset: 'alphabetic',
            capitalization: "lowercase"
        }),
        email: `${firstname}@test.com`,
        password: "1",
        username: `${firstname}@test.com`,
    });

    user.save(function (err) {
        if (err) return console.log(err);

        res.redirect("/users");

    });

});


router.get('/delete/:id', function (req, res, next) {

    const { id } = req.params;
    User.remove({ _id: id }, (err) => {
        if (err) { return console.log(err); }
        res.redirect("/users");
    });

});

router.get('/delete', function (req, res, next) {

    User.remove({}, (err) => {
        if (err) { return console.log(err); }
        res.redirect("/users");
    });

});



module.exports = router;