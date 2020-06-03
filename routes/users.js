const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')
/* GET users listing. */

// localhost:3000/user
router.get('/', userControllers.index);

// localhost:3000/user/login
router.get('/login', userControllers.login);
// localhost:3000/user/register
router.post('/register', userControllers.register);

module.exports = router;
