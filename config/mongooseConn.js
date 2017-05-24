const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let env = process.env.NODE_ENV;

console.log('\x1b[36m%s\x1b[0m', `\n${env} ENV activated\n`);
process.env.MONGODB_URI = 'mongodb://admin:admin@ds139791.mlab.com:39791/bilbokning';

if (env === 'test') {
    process.env.MONGODB_URI = 'mongodb://admin:admin@ds137121.mlab.com:37121/bilbokning_test';
} else if (env === "localhost") {
    process.env.MONGODB_URI = "mongodb://localhost/bilbokning";
}

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("error", (err) => {
    console.log(err);
});

mongoose.connection.on('connected', () => {
    console.log("Connected to database");
});

module.exports = mongoose;