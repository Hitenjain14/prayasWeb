const express = require('express');
const allController = require('./../controllers/allController');
const authController = require('./../controllers/authController');
const completedEvent = require('./../controllers/completedController');
const router = express.Router();

router.route('/').get(allController.getAllEvents);
router.route('/completed-event/:id').get(completedEvent.getEvent);
router
  .route('/adminPage')
  .get(authController.protect, allController.getAdminPage);

module.exports = router;
