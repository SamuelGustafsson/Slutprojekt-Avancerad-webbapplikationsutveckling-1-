const mongoose      = require("mongoose");
const url           = "mongodb://admin:admin@ds139791.mlab.com:39791/bilbokning";

mongoose.connect(url);
mongoose.connection.on("error",(err) => {
  console.log(err);
});
mongoose.connection.on("connected",() => {
  console.log("connected to mongoose");
});
mongoose.Promise = global.Promise;

