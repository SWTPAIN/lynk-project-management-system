const config = require('./config')
const app = require('./app')

console.log('config', config)
app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port)
})
