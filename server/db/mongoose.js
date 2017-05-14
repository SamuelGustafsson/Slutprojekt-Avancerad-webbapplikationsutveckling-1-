let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log("Connected to database");
});

module.exports = { mongoose };