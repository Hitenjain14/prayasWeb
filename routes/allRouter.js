const express = require('express');
const allController = require('./../controllers/allController');
const router = express.Router();

router.route('/').get(allController.getAllEvents);
router.get('/adminPage', allController.getAdminPage);

module.exports = router;
