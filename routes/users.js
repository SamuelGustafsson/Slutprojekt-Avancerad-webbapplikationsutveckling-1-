let express = require('express');
let router = express.Router();

const passport = require("passport");

const randomstring = require("randomstring");
const User = require("../models/users");




const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
};






router.get('/', isLoggedIn, function(req, res, next) {

  User.find((err, result) => {
    if(err){ console.log(err); }
    res.render('users',{
      usersObj: result
    });
  });

});


router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log("hiii");
  res.redirect('/users');
});



router.post('/signup', (req, res) => {
  console.log("-------------");
  console.log(req.body);
  User.register(new User({ username : req.body.username }), req.body.password, (error, user) => {
    console.log(error);
    if (error) return console.log("Failed signup!!!!!");
    passport.authenticate('local')(req, res, ()=> {
      res.redirect('/users');
    });
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/*router.post('/in', passport.authenticate('local'),function(req, res, next) {
  res.redirect('/user');
/!*  const {email, password} = req.body;

  res.send({
    data: req.body
    //data: {email: "test2@test.com", password: 1}
  });*!/

});*/





/*router.post('/signup', function(req, res, next) {
  const {email, password} = req.body;

  res.send({
    data: req.body
    //data: {email: "test2@test.com", password: 1}
  });

});*/






router.get('/insert', function(req, res, next){

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
