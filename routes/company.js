const express = require('express');
const router = express.Router();
const companyControllers = require('../controllers/companyControllers')
const checkAdmin = require('../middleware/checkAdmin')
/* GET users listing. */
const passportJWT = require('../middleware/passportJWT')
// localhost:3000/users
router.get('/', passportJWT.isLogin, checkAdmin.isAdmin, companyControllers.index);

// localhost:3000/users/login

module.exports = router;
