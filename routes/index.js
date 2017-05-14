var express = require('express');
var router = new express.Router();
const { ObjectID } = require('mongodb');

let { Cars } = require('../models/cars');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', {
        title: 'Express'
    });
});

router.get('/cars/car/:id', function(req, res, next) {

    const carID = req.params.id;

    if (!ObjectID.isValid(carID)) {
        return res.status(400).send();
    }

    Cars.findById(carID).then((car) => {

        if (!car) {
            return res.status(404).send();
        }

        res.status(200).json({ car });
    }).catch((e) => send(e));

});

router.post('/cars/car', (req, res) => {

    let car = new Cars({
        brand: req.body.brand,
        automat: req.body.automat,
        roof_rack: req.body.roof_rack,
        price: req.body.price,
        booked: req.body.booked,
        seats: req.body.seats
    });

    car.save().then((doc) => {
        return res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/cars/car', (req, res) => {
    Cars.find().then((cars) => {
        res.status(200).send({ cars });
    }, (err) => {
        res.status(404).send(err);
    });
});

router.delete('/cars/car/:id', (req, res) => {

    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Cars.findByIdAndRemove(id).then((car) => {

        if (!car) {
            return res.status(404).send();
        }

        res.status(200).send({ car });

    }).catch((e) => {
        res.status(400).send(e);
    });
});

module.exports = { router };