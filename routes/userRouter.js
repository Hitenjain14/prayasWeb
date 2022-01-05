const express = require('express');
const authController = require('./../controllers/authController');
const allController = require('../controllers/allController');
//const test = require('./../controllers/test');
const router = express.Router();

router.post('/', authController.login);

//router.post('/login', test.test_);

module.exports = router;
