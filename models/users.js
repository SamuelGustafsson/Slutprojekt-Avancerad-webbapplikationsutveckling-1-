const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;


const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = Schema(
    {
/*        firstname: {
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
        },*/
      username: String,
      password: String
    }
);

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', userSchema);
module.exports = User;