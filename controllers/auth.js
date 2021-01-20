const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  })
}

exports.postLogin = (req, res, next) => {
  User.findById('6006413a3d1e2930d1daaa84')
    .then(user => {
      req.session.isLoggedIn = true
      req.user = user
      req.session.save(() => {
        res.redirect('/')
      })
    })
    .catch()
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}
