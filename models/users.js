const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;


const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = Schema(
    {
      username: {
        type: mongoose.SchemaTypes.Email,
        required: true
      },
      password: String,
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
    }
);

userSchema.plugin(passportLocalMongoose, {
  selectFields: 'username firstname lastname email'
});

let User = mongoose.model('User', userSchema);
module.exports = User;