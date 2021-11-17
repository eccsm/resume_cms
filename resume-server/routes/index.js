var express = require('express');
var router = express.Router();
var resume = require('./resume');
router.use('/resume', resume);
module.exports = router;