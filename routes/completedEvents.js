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
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .route('/addCompletedEvent')
  .post(upload.single('titleImage'), completedEvent.newEvent);

router
  .route('/completedEvent/:id')
  .get(authController.protect, completedEvent.deleteCompleted);

module.exports = router;
