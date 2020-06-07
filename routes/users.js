const express = require('express');
const { body } = require('express-validator')
const router = express.Router();
const userControllers = require('../controllers/userControllers')
/* GET users listing. */

// localhost:3000/user
router.get('/', userControllers.index);

// localhost:3000/user/login
router.post('/login', userControllers.login);
// localhost:3000/user/register
router.post('/register',
  body('name').not().isEmpty().withMessage('กรุณาป้อนข้อมูลชื่อสกุลด้วย'),
  body('email').not().isEmpty().withMessage('กรุณากรอกอีเมลด้วย').isEmail().withMessage('รูปแบบอีเมลไม่ถูกต้อง'),
  body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่านด้วย').isLength({ min: 3 }).withMessage('รหัสผ่านต้องมากกว่า 3 ตัวอักษร'),
  userControllers.register);

module.exports = router;
