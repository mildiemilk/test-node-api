const express = require('express');
const router = express.Router();
const shopControllers = require('../controllers/shopControllers')
/* GET users listing. */

// localhost:3000/
router.get('/', shopControllers.index);

router.get('/menu', shopControllers.menu);

// localhost:3000/users/login

module.exports = router;
