const express = require('express');
const completedEvent = require('./../controllers/completedController');
const authController = require('./../controllers/authController');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route('/').get(completedEvent.getAllEvents);

router
  .route('/addCompletedEvent')
  .post(authController.protect, completedEvent.newEvent);

router
  .route('/completed-event:id')
  .get(completedEvent.getEvent)
  .delete(authController.protect, completedEvent.deleteCompleted);

module.exports = router;
