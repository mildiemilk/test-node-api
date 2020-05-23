const express = require('express');
const router = express.Router();
const shopControllers = require('../controllers/shopControllers')
/* GET users listing. */

// localhost:3000/
router.get('/', shopControllers.index);

router.get('/menu', shopControllers.menu);
router.get('/:id', shopControllers.getShopWithMenu);
router.post('/', shopControllers.insert)

// localhost:3000/users/login

module.exports = router;
