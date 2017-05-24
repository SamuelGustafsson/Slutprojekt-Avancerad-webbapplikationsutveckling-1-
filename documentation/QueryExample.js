
// Returns all booked cars for user
Bookings.find({ user_id: req.user._id })
    // -_id Removes _id from result
    .select("-_id car_id date_to date_from")
    .exec((err, booking) => {
        console.info(booking);
        const car_idArray = booking.map(obj => obj.car_id);

        Cars.find()
            .where('_id')
            .in(car_idArray)
            .exec((err, cars) => {
                console.log(cars);
                res.render('reservation', { usersObj: cars });
            });
    })