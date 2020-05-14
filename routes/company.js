const express = require('express');
const router = express.Router();
const companyControllers = require('../controllers/companyControllers')
/* GET users listing. */

// localhost:3000/users
router.get('/', companyControllers.index);

// localhost:3000/users/login

module.exports = router;
