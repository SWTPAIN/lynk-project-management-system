const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.database)
  .catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
  })

mongoose.connection.on('error', function (err) {
  console.error('MongoDB error: %s', err)
})
