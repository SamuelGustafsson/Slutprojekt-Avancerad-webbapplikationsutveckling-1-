let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let carSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    automat: {
        type: Boolean,
        required: true,
    },
    roof_rack: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    booked: {
        type: Boolean,
        required: true
    },
    seats: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

let Cars = mongoose.model('Car', carSchema);

module.exports = { Cars };