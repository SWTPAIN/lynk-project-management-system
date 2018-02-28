const AuthenticationController = require('./controllers/authentication')
const ProjectController = require('./controllers/project')
const express = require('express')
require('./config/passport')
const passport = require('passport')

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

module.exports = function (app) {
  // Initializing route groups
  const apiRoutes = express.Router()
  const authRoutes = express.Router()
  const projectRoutes = express.Router()

  // Auth Routes

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes)
  apiRoutes.use('/projects', projectRoutes)

  // Registration route
  authRoutes.post('/register', AuthenticationController.register)

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login)

  // Project route
  projectRoutes.get('/', requireAuth, ProjectController.getAll)
  projectRoutes.put('/:projectId', requireAuth, ProjectController.updateOne)

  // Set url for API group routes
  app.use('/api', apiRoutes)
}
