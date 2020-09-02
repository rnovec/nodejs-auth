var express = require('express');
var router = express.Router();
const { createToken } = require('../utils/auth')
    /* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    res.send(createToken({ foo: 'bar' }));
});

module.exports = router;