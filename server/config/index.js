require('dotenv').config()

module.exports = {
  // Secret key for JWT signing and encryption
  'jwtSecret': process.env.JWT_SECRET || 'very secret',
  'database': process.env.MONGO_DB_URL || 'mongodb://localhost:27017/lynk_pms_dev',
  // Setting port for server
  'port': process.env.PORT || 5000
}
