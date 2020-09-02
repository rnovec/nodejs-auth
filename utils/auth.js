require('dotenv').config()
var jwt = require('jsonwebtoken')

function createToken(data) {
    return jwt.sign(data, process.env.SECRET);
}

module.exports = {
    createToken
}