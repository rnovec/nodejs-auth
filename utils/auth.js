require('dotenv').config()
var jwt = require('jsonwebtoken')

function createToken (data) {
  return jwt.sign(
    { data, exp: Math.floor(Date.now() / 1000) + 60 * 2 },
    process.env.SECRET
  )
}

function verifyToken (token) {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = {
    createToken,
    verifyToken
}
