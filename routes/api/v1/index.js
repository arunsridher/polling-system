//include express and create a router
const express = require('express');
const router = express.Router();

router.use('/questions', require('./questions'));
router.use('/options', require('./options'));

//export router
module.exports = router;