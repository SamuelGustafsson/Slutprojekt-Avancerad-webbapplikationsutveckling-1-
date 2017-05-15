const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

let Cars = require('../models/cars');

const carsRouter = express.Router();
carsRouter.use(bodyParser.json());
carsRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


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
            console.log('Car created!');
            console.info(req.body);
        });
    })

module.exports = carsRouter;

