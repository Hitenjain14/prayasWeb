const express = require('express');
const authController = require('./../controllers/authController');
//const test = require('./../controllers/test');
const router = express.Router();

router.post('/login', authController.login);
//router.post('/login', test.test_);

module.exports = router;
