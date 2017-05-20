const mongoose = require("mongoose");
const env = process.env.NODE_ENV;
let url = "mongodb://admin:admin@ds139791.mlab.com:39791/bilbokning";

if (env === "test") {
    url = "mongodb://admin:admin@ds137121.mlab.com:37121/bilbokning_test";
} else if (env === "localhost") {
    url = "mongodb://localhost/bilbokning";
}
console.log('\x1b[36m%s\x1b[0m', `\n${env} ENV activated\n`);



mongoose.createConnection(url);
mongoose.connection.on("error", (err) => {
    console.log(err);
});
mongoose.connection.on("connected", () => {
    console.log("connected to mongoose");
});
mongoose.Promise = global.Promise;

module.exports = { mongoose };