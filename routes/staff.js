const express = require('express');
const router = express.Router();
const staffControllers = require('../controllers/staffControllers')
/* GET users listing. */

// localhost:3000/users
router.get('/', staffControllers.index);
router.get('/:id', staffControllers.show);
router.post('/', staffControllers.insert);
router.delete('/:id', staffControllers.destroy);
router.put('/:id', staffControllers.update);

// localhost:3000/users/login

module.exports = router;
