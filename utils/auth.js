require('dotenv').config()
var jwt = require('jsonwebtoken')

function createToken (data, type = 'access', expiresIn = '1h') {
  return jwt.sign(
    { type, data },
    process.env.SECRET,
    { expiresIn }
  )
}

function verifyToken (token) {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = {
    createToken,
    verifyToken
}
