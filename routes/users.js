var express = require('express');
var router = express.Router();

/* GET users listing. */

// localhost:3000/users
router.get('/', function (req, res, next) {
  res.status(200).json({
    message: 'Success'
  })
});

// localhost:3000/users/login
router.get('/login', function (req, res, next) {
  res.status(200).json({
    message: 'Login'
  })
});

module.exports = router;
