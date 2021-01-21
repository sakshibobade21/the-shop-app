const bcrypt = require('bcryptjs')
const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  })
}

exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.redirect('/signup')
      }
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true
            req.session.user = user
            return req.session.save(() => {
              res.redirect('/')
            })
          }
          return res.redirect('/login')
        })
        .catch(err => console.log(err))
    })
    .catch()
}
exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Sign Up',
    isAuthenticated: false
  })
}

exports.postSignup = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  // const confirmPassword = req.body.confirmPassword

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/login')
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          })
          return user.save()
        })
        .then(result => {
          res.redirect('/')
        })
    })
    .catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}
