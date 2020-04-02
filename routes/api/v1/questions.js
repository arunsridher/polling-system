//include express and create a router
const express = require('express');
const router = express.Router();

//include questions controller
const questionController = require('../../../controllers/api/v1/questionsController');

router.post('/create', questionController.createQuestion);
router.post('/:id/options/create', questionController.addOptions);
router.get('/:id', questionController.fetchQuestion);
router.delete('/:id/delete', questionController.deleteQuestion);

//export router
module.exports = router;