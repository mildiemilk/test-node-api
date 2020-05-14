const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')
/* GET users listing. */

// localhost:3000/users
router.get('/', userControllers.index);

// localhost:3000/users/login
router.get('/login', userControllers.login);

module.exports = router;
