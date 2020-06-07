const User = require('../models/user')

exports.index = (req, res, next) => {
  res.status(200).json({
    message: 'Success'
  })
}

exports.login = (req, res, next) => {
  res.status(200).json({
    message: 'Login'
  })
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