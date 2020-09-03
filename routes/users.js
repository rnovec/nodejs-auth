var express = require('express')
var router = express.Router()
const { createToken, verifyToken } = require('../utils/auth')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/login', function (req, res, next) {
  const data = req.body
  // validación
  res.send({
    access: createToken(data, 'access'),
    refresh: createToken(data, 'refresh')
  })
})

router.post('/refresh/token', function (req, res, next) {
  const token = req.body.token
  console.log(token)
  res.send({
    access: createToken(data, 'access')
  })
})


router.post('/verify/token', function (req, res, next) {
  const token = req.body.token
  // validación
  console.log(token)
  res.send({
    isValid: verifyToken(token)
  })
})

module.exports = router
