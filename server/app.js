const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./router')
require('./db')

const app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))

router(app)
module.exports = app
