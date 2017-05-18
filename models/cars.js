const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let carSchema = new Schema(
    {
        brand: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true
        },
        automatic: {
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
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

let Car = mongoose.model('Car', carSchema);
module.exports = Car;
