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