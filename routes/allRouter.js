const express = require('express');
const allController = require('./../controllers/allController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/').get(allController.getAllEvents);
router
  .route('/adminPage')
  .get(authController.protect, allController.getAdminPage);

module.exports = router;
