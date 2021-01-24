const express = require('express')
const router = express.Router()
const { check, body } = require('express-validator')

const authController = require('../controllers/auth')
const User = require('../models/user')
// const validateMiddleware = require('../middleware/validate')

router.get('/login', authController.getLogin)
router.get('/signup', authController.getSignup)
router.post('/login',
  [
    check('email')
      .isEmail()
      .withMessage('Entered email id is invalid'),
    body('password', 'Enter the valid password')
      .isLength({ min: 4 })
  ],
  authController.postLogin)
router.post('/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter the valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject(new Error('This email exists already. Please pick a different one'))
            }
          })
      }),
    body('password', 'Password must be atleast 4 characters long')
      .isLength({ min: 4 }),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Re-enter the correct password')
        }
        return true
      })
  ],
  authController.postSignup)
// router.post('/signup', validateMiddleware.validateSignUp, authController.postSignup)
router.post('/logout', authController.postLogout)
router.get('/reset', authController.getReset)
router.post('/reset', authController.postReset)
router.get('/reset/:token', authController.getNewPassword)
router.post('/new-password', authController.postNewPassword)

module.exports = router
