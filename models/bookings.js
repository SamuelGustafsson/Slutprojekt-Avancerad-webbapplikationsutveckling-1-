let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let bookingSchema = new Schema({
    car_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
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

// http://stackoverflow.com/questions/12573753/creating-multifield-indexes-in-mongoose-mongodb
bookingSchema.index({car_id: 1, user_id: 1}, {unique: true});

let Bookings = mongoose.model('Booking', bookingSchema);
module.exports = Bookings;

