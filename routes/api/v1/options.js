//include express and create a router
const express = require('express');
const router = express.Router();

//include options controller
const optionsController = require('../../../controllers/api/v1/optionsController');

router.delete('/:id/delete', optionsController.deleteOption);
router.get('/:id/add_vote', optionsController.addVote);

//export router
module.exports = router;