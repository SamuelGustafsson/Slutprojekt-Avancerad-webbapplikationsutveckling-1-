let express = require('express');
let router = express.Router();

const passport = require("passport");

const randomstring = require("randomstring");
const User = require("../models/users");





router.post('/login', passport.authenticate('local', { failureRedirect: "/?formError=true" }), (req, res) => {
  res.redirect('/cars');
});

router.post('/signup', (req, res) => {
  User.register(new User({
    username : req.body.username,
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.username,
  }), req.body.password, (error, user) => {
    if (error) return res.redirect("/signup?formError=true");
    passport.authenticate('local')(req, res, ()=> {
      res.redirect('/users');
    });
  });
});

/*
  middleware: redirect user IF one is NOT logged in
 (one is unable to access routes after this middleware!)
*/
router.use( (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/?authError=true');
});


router.get('/', function(req, res, next) {

  User.find((err, result) => {
    if(err){ console.log(err); }

    res.render('users',{
      usersObj: result
    });
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/insert', function(req, res, next){
  /* ! does not insert a reg. user with a hashed password atm! */

   let firstname = randomstring.generate({
    length: 4,
    charset: 'alphabetic',
    capitalization: "lowercase"
   });

   let user = new User({
     firstname: firstname,
     lastname: randomstring.generate({
       length: 4,
       charset: 'alphabetic',
       capitalization: "lowercase"
     }),
     email: `${firstname}@test.com`,
     password: "1",
     username: `${firstname}@test.com`,
   });

   user.save(function (err) {
   if(err) return console.log(err);

    res.redirect("/users");

   });

});


router.get('/delete/:id', function(req, res, next){

  const {id} = req.params;
  User.remove({ _id: id }, (err) => {
    if(err){ return console.log(err);}
    res.redirect("/users");
  });

});

router.get('/delete', function(req, res, next){

  User.remove({}, (err) => {
    if(err){ return console.log(err);}
    res.redirect("/users");
  });

});

module.exports = router;
