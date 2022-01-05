const express = require('express');
const completedEvent = require('./../controllers/completedController');
const authController = require('./../controllers/authController');
const path = require('path');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const multiUpload = upload.fields([
  { name: 'titleImage', maxCount: 1 },
  { name: 'imageGallery', maxCount: 12 },
]);

router
  .route('/addCompletedEvent')
  .post(authController.protect, multiUpload, completedEvent.newEvent);

router
  .route('/completedEvent/:id')
  .get(authController.protect, completedEvent.deleteCompleted);

module.exports = router;
