let express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next){

  const {formError, authError} = req.query;
  res.render('index', {
    title: 'Bilbokningen - login',
    formError: formError,
    authError: authError,
  });
});


router.get('/signup', function (req, res, next){

  const {formError} = req.query;
  res.render('signup', {
    formError: formError
  });
});

module.exports = router;
