const express = require('express');
const bookingsRouter = express.Router();
const mongoose = require('mongoose');

let Bookings = require('../models/bookings');

bookingsRouter.route('/')

    // Display all bookings
    .get((req, res, next) => {
        Bookings.find({}, (error, reservation) => {
            if (error) throw error;
            res.json(reservation);
        })
    })

        // book a car
    .post((req, res, next) => {
        Bookings.create(req.body, (err, reservation) => {
            if (err) throw err;
            res.json(reservation);
            console.log(`Reservation made`)
        });
    })



module.exports = bookingsRouter;