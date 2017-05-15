let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/in', function(req, res, next) {
  const {email, password} = req.body;

  res.send({
    data: req.body
    //data: {email: "test2@test.com", password: 1}
  });

});

module.exports = router;
