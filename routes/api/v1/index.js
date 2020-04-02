//include express and create a router
const express = require('express');
const router = express.Router();

router.use('/questions', require('./questions'));

//export router
module.exports = router;