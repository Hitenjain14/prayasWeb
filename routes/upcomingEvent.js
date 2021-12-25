const express = require('express');
const router = express.Router();

router.route('/').get(upcomEvent.getAllEvents);
router.route('/completed-event').get(upcomEvent.getId, upcomEvent.getEvent);

module.exports = router;
