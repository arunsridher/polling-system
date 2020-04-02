//include express and create a router
const express = require('express');
const router = express.Router();

//redirect all questions routes to questions.js
router.use('/questions', require('./questions'));

//redirect all options routes to options.js
router.use('/options', require('./options'));

//export router
module.exports = router;