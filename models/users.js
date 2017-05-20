const { mongoose } = require('../config/mongooseConn');
require('mongoose-type-email');
let Schema = mongoose.Schema;


const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new Schema({
    username: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
});

userSchema.plugin(passportLocalMongoose, {
    selectFields: 'username firstname lastname email'
});

let User = mongoose.model('User', userSchema);
module.exports = { User };