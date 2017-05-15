const mongoose    = require("mongoose");
let url           = "mongodb://admin:admin@ds139791.mlab.com:39791/bilbokning";

if( process.env.NODE_ENV === "test" ){
  console.log('\x1b[36m%s\x1b[0m', "\nTest ENV activated\n");
  url = "mongodb://admin:admin@ds139791.mlab.com:39791/bilbokningTest";
}

mongoose.connect(url);
mongoose.connection.on("error",(err) => {
  console.log(err);
});
mongoose.connection.on("connected",() => {
  console.log("connected to mongoose");
});
mongoose.Promise = global.Promise;

