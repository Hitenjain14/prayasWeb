const express = require('express');
const upcomingEvent = require('./../controllers/upcomingController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('').get(upcomingEvent.getAllEvents);

router
  .route('/addUpcomingEvent')
  .post(authController.protect, upcomingEvent.addEvent);

router
  .route('/completed-event:id')

  .delete(authController.protect, upcomingEvent.deleteEvent);

module.exports = router;
