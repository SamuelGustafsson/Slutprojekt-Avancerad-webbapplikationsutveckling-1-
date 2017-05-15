var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Mongoose connection URL
const url = 'mongodb://admin:admin@ds139791.mlab.com:39791/bilbokning';

mongoose.connect(url);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected correctly to server");
});

// let Car = require('./models/cars');

// let newCar = new Car({
//   brand: "BMW",
//   model: "318d Touring",
//   automat: false,
//   roof_rack: false,
//   price: 320000,
//   booked: false,
//   seats: 5,
//   image: "http://static.holmgrensbil.se/Bilar/ECP214.jpg?width=1600"
// });

// newCar.save((error, car) => {
//   if (error) {
//     console.log(`Something went wrong when saving ${newcar} to database`)
//   }
//   else {
//     console.log(`${newCar} was added to database`)
//   }
// });



// Routes
var index = require('./routes/index');
var users = require('./routes/users');
let carsRouter = require('./routes/carsRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/cars', carsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
