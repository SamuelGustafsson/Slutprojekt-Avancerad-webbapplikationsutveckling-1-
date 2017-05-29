const express = require('express');
const bookingsRouter = express.Router();
const mongoose = require('mongoose');

let Bookings = require('../models/bookings');
let Cars = require('../models/cars');


/*
  middleware: redirect user IF one is NOT logged in
 (one is unable to access routes after this middleware!)
*/
bookingsRouter.use((req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect('/?authError=true');
});

bookingsRouter.route('/')

    // Display all reservations (POSTMAN)
    .get((req, res, next) => {
        Bookings.find({}, (error, reservation) => {
            if (error) throw error;
            res.json(reservation);
        })
    })

    // Add reservation (POSTMAN)
    .post((req, res, next) => {
        Bookings.create(req.body, (err, reservation) => {
            if (err) throw err;
            res.json(reservation);
            console.log(`Reservation made`)
        });
    });

bookingsRouter.route('/:reservationId')

    // Get reservation by id (POSTMAN)
    .get((req, res, next) => {
        Bookings.findById(req.params.reservationId, (error, reservation) => {
            if (error) throw error;
            res.json(reservation);
            console.log(`Reservation id: ${req.params.reservationId} requested`)
        })
    })

    // Update reservation by id (POSTMAN)
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

    // Delete Reservation (POSTMAN)
    .delete((req, res, next) => {
        Bookings.findByIdAndRemove(req.params.reservationId, (error, reservation) => {
            console.info(reservation);
        })
    })

    // Cancel reservation
    // It is a POST request because it deletes and update.
    .post((req, res, next) => {

        const bookingsId = req.params.reservationId;

        Bookings.findByIdAndRemove(bookingsId).then((reservationObj) => {
            const car_id = reservationObj.car_id;
            return Cars.findByIdAndUpdate(car_id, { $set: { booked: false } }, { new: true });
        }).then((updatedCarObj) => {
            res.redirect('back');
        })
    });


bookingsRouter.route('/car/:carId')

    // It is a POST request because it POST a reservation object and updates car object.
    .post((req, res, next) => {

        const reservationData = {
            car_id: req.params.carId,
            user_id: req.user._id,
            date_from: req.body.date_from,
            date_to: req.body.date_to
        };

        Cars.findByIdAndUpdate(reservationData.car_id, { $set: { booked: true } }, { new: true }).then((car) => {
            return Bookings.create(reservationData);
        }).then((reservation) => {
            res.send(reservation);
        }).catch((e) => {
            console.log("Unable to insert your bookings request", e);
        });
    });


/* dummy route: delete every booking req */
bookingsRouter.route('/dummy/delete')
    .get((req, res, next) => {

        Bookings.remove({}, (err, car) => {
            if (err) throw err;
            console.log("Remove all dummy bookings");
            res.redirect("/users/reservation");
        });

    });

module.exports = bookingsRouter;