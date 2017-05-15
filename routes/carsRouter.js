const express = require('express');
// var bodyParser = require('body-parser');
const mongoose = require('mongoose');

let Cars = require('../models/cars');

const carsRouter = express.Router();
// carsRouter.use(bodyParser.json());
// carsRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// }));


carsRouter.route('/')

    // Display all cars
    .get((req, res, next) => {
        Cars.find({}, (error, cars) => {
            if (error) throw error;
            res.json(cars);
        })
    })
    // Add a car
    .post((req, res, next) => {
        Cars.create(req.body, (err, car) => {
            if (err) throw err;
            res.json(car);
        });
    })

carsRouter.route('/carId')
    .get(function (req, res, next) {
        Cars.findOne({ _id: req.params._id }, (error, car) => {
            if (error) throw error;
            res.json(car);
        })
    })

    .patch((req, res, next) => {
        var updateObject = req.body;
        var id = req.params.id;
        Cars.update({ _id: ObjectId(id) }, { $set: updateObject });
        console.log(`Car id: ${id} updated`);
    })

    .delete(function (req, res, next) {
        Cars.remove({_id: req.params._id}, (error, car) => {
            if (error) throw error 
            console.log(`Car ${req.params._id} deleted:`);
            console.log(car);

        })
    });

module.exports = carsRouter;

