const express = require('express');
// var bodyParser = require('body-parser');
const mongoose = require('mongoose');

let Cars = require('../models/cars');

const carsRouter = express.Router();

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

carsRouter.route('/:carId')
    .get(function (req, res, next) {
        Cars.findById(req.params.carId, (error, car) => {
            if (error) throw error;
            res.json(car);
        })
    })

    // Update car by id
    .put(function (req, res, next) {
        Cars.findByIdAndUpdate(
            req.params.carId,
            {
                $set: req.body
            },
            {
                new: true
            },
            function (err, car) {
                if (err) throw err;
                res.json(car);
            });
    })
    // Delete car by id
    .delete(function (req, res, next) {
        Cars.remove({ _id: req.params.carId }, (error, car) => {
            if (error) throw error
            console.log(`Car ${req.params.carId} deleted:`);
            res.send(`Car id: ${req.params.carId} has been deleteted`);
        })
    });

module.exports = carsRouter;

