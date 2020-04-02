//include express and create a router
const express = require('express');
const router = express.Router();

//redirect all api URLs to api's index.js
router.use('/api', require('./api'));

//export router
module.exports = router;