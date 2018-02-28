const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')

const TTL = 60 * 60 * 24 // 1 day in seconds
function generateToken (user) {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: TTL
  })
}

function setUserInfo (request) {
  return {
    _id: request._id,
    email: request.email
  }
}

// Login Route
exports.login = function (req, res, next) {
  let userInfo = setUserInfo(req.user)

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  })
}

// Registration Route
exports.register = function (req, res, next) {
  // Check for registration errors
  const email = req.body.email
  const password = req.body.password

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' })
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' })
  }

  // Return error if password is too short
  if (password.length < 8) {
    return res.status(422).send({ error: 'Password much be longer or equal to 8' })
  }
  // Return error if passowrd contain non letters or number
  if (!/^[a-z0-9]+$/i.test(password)) {
    return res.status(422).send({ error: 'Password can only contain letters and number' })
  }

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err) }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' })
    }

    // If email is unique and password was provided, create account
    let user = new User({
      email: email,
      password: password
    })

    user.save(function (err, user) {
      if (err) { return next(err) }

      // Subscribe member to Mailchimp list
      // mailchimp.subscribeToNewsletter(user.email);

      // Respond with JWT if user was created

      let userInfo = setUserInfo(user)

      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      })
    })
  })
}
