const mongoose = require('mongoose').require('mongoose-type-email');
Schema = mongoose.Schema;



let userSchema = Schema(
    {
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
        password: {
            type: String,
            required: true
        }        
       
    }
);

let User = mongoose.model('User', carSchema);
module.exports = User;