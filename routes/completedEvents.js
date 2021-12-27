const express = require('express');
const completedEvent = require('./../controllers/completedController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(completedEvent.getAllEvents)
  .post(authController.protect, completedEvent.newEvent);
router
  .route('/completed-event:id')
  .get(completedEvent.getEvent)
  .delete(authController.protect, completedEvent.deleteCompleted);

module.exports = router;
