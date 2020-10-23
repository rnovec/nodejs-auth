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
  console.log(data)
  res.send({
    access: createToken(data),
    refresh: createToken(data, 'refresh', '1d')
  })
})

router.post('/refresh/token', (req, res, next) => {
  let token = req.body.refresh
  try {
    token = verifyToken(token)
    console.log(token)
    res.send({
      access: createToken(token.data)
    })
  } catch (error) {
    res.send(error)
  }
})

router.post('/verify/token', async function (req, res, next) {
  const token = req.body.token
  // validación
  try {
    res.send({
      isValid: verifyToken(token)
    })
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
