const express = require('express');
const upcomingEvent = require('./../controllers/upcomingController');
const completedEvent = require('./../controllers/completedController');
const authController = require('./../controllers/authController');
const router = express.Router();

// router.route('/').get(completedEvent.getAllEvents, upcomingEvent.getAllEvents);

router
  .route('/addUpcomingEvent')
  .post(authController.protect, upcomingEvent.addEvent);

router
  .route('/upcoming-event/:id')

  .get(authController.protect, upcomingEvent.deleteEvent);

module.exports = router;
