const express = require('express');
const upcomEvent = require('./../controllers/upcomingController');
const router = express.Router();

router.route('/').get(upcomEvent.getAllEvents);
router
  .route('/completed-event:id')
  .post(authController.protect, upcomEvent.newEvent)
  .delete(authController.protect, upcomEvent.deleteEvent);

module.exports = router;
