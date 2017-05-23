const express = require('express');
const carsRouter = express.Router();
const mongoose = require('mongoose');

let Cars = require('../models/cars');

// TODO Uncomment this later
/*
  middleware: redirect user IF one is NOT logged in
 (one is unable to access routes after this middleware!)
*/
// carsRouter.use((req, res, next) => {
//     if (req.isAuthenticated()) return next();
//     res.redirect('/?authError=true');
// });

carsRouter.route('/')

// Display all cars
.get((req, res, next) => {

  let seats = req.query.seats || 7;
  let price = req.query.price || 2000;
  let brand = req.query.brand || "";

  Cars.find({
    booked: false,
    seats: { $gte: 0, $lte: seats },
    price: { $gte: 0, $lte: price },
    brand: {
      $regex: new RegExp(brand, "gi")
    }
  }, (error, cars) => {
    if (error) throw error;
    res.render('booking',{
      cars,
      searchFormData: {seats, price, brand}
    });
  })

/*    Cars.find({
      booked: false
    }, (error, cars) => {
            if (error) throw error;
            res.render('booking',{
              cars
            });
        })*/
})

// Add a car
.post((req, res, next) => {
    Cars.create(req.body, (err, car) => {
        if (err) throw err;
        res.json(car);
        console.log(`Added: ${req.body.brand} ${req.body.model} to database`);
    });
});

carsRouter.route('/:carId')

// Get car by id
.get((req, res, next) => {
    Cars.findById(req.params.carId, (error, car) => {
        if (error) throw error;
        res.json(car);
    })
})

// Update car by id
.put((req, res, next) => {
        Cars.findByIdAndUpdate(req.params.carId, { $set: req.body },

            // return the modified document rather than the original. defaults to false
            { new: true },
            (err, car) => {
                if (err) throw err;
                res.json(car);
            });
    })
    // Delete car by id
    .delete((req, res, next) => {
        Cars.remove({ _id: req.params.carId }, (error, car) => {
            if (error) throw error
            console.log(`Car ${req.params.carId} deleted:`);
            res.send(`Car id: ${req.params.carId} has been deleteted`);
        })
    });



/* cars filter ajax fn */
carsRouter.route('/filter')
  .post((req, res, next) => {

    let seats = req.body.seats || 7;
    let price = req.body.price || 2000;
    let brand = req.body.brand || "";

    Cars.find({
      booked: false,
      seats: { $gte: 0, $lte: seats },
      price: { $gte: 0, $lte: price },
      brand: {
        $regex: new RegExp(brand, "gi")
      }
    }, (error, cars) => {
      if (error) throw error;
      res.send({
        cars,
      });
    });


  });

/* dummy routes start */
carsRouter.route('/dummy/insert')
    .get((req, res, next) => {

        const json = require("../dummy-cars.json");
        Cars.create(json, (err, car) => {
            if (err) throw err;
            console.log("Dummy cars added from dummy-cars.json");
            res.redirect("/");
        });

    });

carsRouter.route('/dummy/delete')
    .get((req, res, next) => {

        Cars.remove({}, (err, car) => {
            if (err) throw err;
            console.log("Remove all dummy cars");
            res.redirect("/");
        });

    });

module.exports = carsRouter;