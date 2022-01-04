const express = require('express');
const allController = require('./../controllers/allController');
const router = express.Router();

router.route('/').get(allController.getAllEvents);

module.exports = router;
