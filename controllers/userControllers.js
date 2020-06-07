const User = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.index = (req, res, next) => {
  res.status(200).json({
    message: 'Success'
  })
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    console.log('user:', user)
    if (!user) {
      const error = new Error('User is not found')
      error.statusCode = 404
      throw error
    }
    const isValidPassword = await user.checkPassword(password)
    if (!isValidPassword) {
      const error = new Error('Wrong password')
      error.statusCode = 401
      throw error
    }

    // create token
    // gen secret key from 'grc.com/passwords.html
    const token = await jwt.sign({
      id: user._id,
      role: user.role
    }, config.JWT_SECRET, { expiresIn: '5 days' })

    // decode expire date
    const expires_in = jwt.decode(token)
    res.status(200).json({
      access_token: token,
      expiresIn: expires_in.exp,
      token_type: 'Bearer'
    })

  } catch (e) {
    next(e)
  }
}

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body
  // Check email duplicate

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Data incorrect')
      error.statusCode = 422
      error.validation = errors.array()
      throw error
    }

    const existEmail = await User.findOne({ email })
    if (existEmail) {
      const error = new Error('email duplicate')
      error.statusCode = 400
      throw error
    }
    let user = new User()
    user.name = name
    user.email = email
    user.password = await user.encryptPassword(password)

    await user.save()

    res.status(200).json({
      message: 'Register success'
    })

  } catch (e) {
    next(e)
  }
}