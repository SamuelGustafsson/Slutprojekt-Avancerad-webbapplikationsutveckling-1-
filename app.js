let express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),

    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');


require("./config/mongooseConn");
require("./config/hbsHelper");

const User = require('./models/users');

// Routes
let index = require('./routes/index');
let users = require('./routes/users');
let carsRouter = require('./routes/carsRouter');
let bookingsRouter = require('./routes/bookingsRouter');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules', 'jquery-serializetojson', 'src')));
app.use(logger('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "randomString123",
    resave: true,
    saveUninitialized: false
}));

// Passport configuration with mongoose
// Based on: https://github.com/jesperorb/mongoose-passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Middleware to check if 'req.user' is set
app.use((req, res, next) => {
    console.log("chk user obj exist: ", req.user);
    next();
});

// middleware: set global value(s)
app.use((req, res, next) => {

  let devValue = true;
  let env = process.env.NODE_ENV;
  if( env === "localhost" ){
    devValue = true;
  }
  // true equals "show dummy navbar AND hide the prod. navbar
  // false equals "hide dummy navbar AND show the prod. navbar
  app.locals.dev = devValue;

  app.locals.loggedin = false;
  if(req.user){
      app.locals.loggedin = true;
  }
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/cars', carsRouter);
app.use('/bookings', bookingsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

    let err = new Error('Not Found');

    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;