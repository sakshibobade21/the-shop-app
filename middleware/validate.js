const { check } = require('express-validator')

exports.validateSignUp = (req, res, next) => {
  check('email').isEmail().withMessage('Validate Please')
  next()
}
