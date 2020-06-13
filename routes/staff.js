const express = require('express');
const router = express.Router();
const staffControllers = require('../controllers/staffControllers')
const passportJWT = require('../middleware/passportJWT')
/* GET users listing. */

// localhost:3000/staff
router.get('/', passportJWT.isLogin, staffControllers.index);
router.get('/:id', staffControllers.show);
router.post('/', staffControllers.insert);
router.delete('/:id', staffControllers.destroy);
router.put('/:id', staffControllers.update);

// localhost:3000/staff/login

module.exports = router;
