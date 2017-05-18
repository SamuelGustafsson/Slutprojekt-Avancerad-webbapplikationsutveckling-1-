const express = require('express');
const bookingsRouter = express.Router();
const mongoose = require('mongoose');

let Bookings = require('../models/bookings');

// TODO Uncomment this later
/*
  middleware: redirect user IF one is NOT logged in
 (one is unable to access routes after this middleware!)
*/
bookingsRouter.use((req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/?authError=true');
});

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
            { $set: req.body },

            // return the modified document rather than the original. defaults to false
            { new: true },
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


bookingsRouter.route('/car/:carId')

    .post((req, res, next) => {
        // const reservationData = 
        // Bookings.create(req.body, (err, reservation) => {
        //     if (err) throw err;
        //     res.json(reservation);
        //     console.log(`Reservation made`)
        // });
        console.log(`\n \ttestdata: ${req.body.test}`);
        console.log(`\n \tcar id ${req.params.carId}`);
        console.log(`\tUser id: ${req.user._id}`);

        res.send(req.body.test);
    })



module.exports = bookingsRouter;