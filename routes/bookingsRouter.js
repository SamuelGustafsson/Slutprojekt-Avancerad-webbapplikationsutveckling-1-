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

    // Add reservation
    .post((req, res, next) => {
        Bookings.create(req.body, (err, reservation) => {
            if (err) throw err;
            res.json(reservation);
            console.log(`Reservation made`)
        });
    })

bookingsRouter.route('/:reservationId')

    // Get reservation by id
    .get((req, res, next) => {
        Bookings.findById(req.params.reservationId, (error, reservation) => {
            if (error) throw error;
            res.json(reservation);
            console.log(`Reservation id: ${req.params.reservationId} requested`)
        })
    })

    // Update reservation by id
    .put((req, res, next) => {
        Bookings.findByIdAndUpdate(req.params.id, 
        
        // Updates the reservation
        {$set: req.body}, 

        // return the modified document rather than the original. defaults to false
        {new: true},
        (error, reservation) => {
            if (error) throw error;
            res.json(reservation)
        });
    })

    // Delete Reservation
    .delete((req, res, next) => {
        Bookings.findByIdAndRemove(req.params.reservationId, (error, reservation) => {
            console.info(reservation);
        })
    })



module.exports = bookingsRouter;