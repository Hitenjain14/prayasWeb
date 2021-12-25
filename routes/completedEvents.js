const express = require('express');
const router = express.Router();

router.route('/').get(completedEvent.getAllEvents);
router
  .route('/completed-event')
  .get(completedEvent.getId, completedEvent.getEvent);

module.exports = router;
