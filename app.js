require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const jwt = require('express-jwt')
const cors = require('cors')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const { verifyToken } = require('./utils/auth')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use(
  jwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    getToken: req => {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        const token = req.headers.authorization.split(' ')[1]
        try {
          const decoded = verifyToken(token)
          console.log(token)
          if (decoded.type === 'access') return token
        } catch (error) {
          console.log(error)
          return null
        }
      }
      return null
    }
  }).unless({
    path: ['/users/login', '/users/verify/token']
  })
)
app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('NO AUTORIZADO')
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
