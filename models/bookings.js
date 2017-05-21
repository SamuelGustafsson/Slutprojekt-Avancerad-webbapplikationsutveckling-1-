let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let bookingSchema = new Schema({
    car_id: {
        type: String,
        unique: true,
        required: true
    },
    user_id: {
        type: String,
        unique: true,
        required: true
    },
    date_from: {
        type: Date,
        required: true

    },
    date_to: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

let Bookings = mongoose.model('Booking', bookingSchema);
module.exports = Bookings;