const express = require('express');
const controller = require('./auth.controller');
const router = express.Router();

router.post('/login', controller.login);
router.post('/send-otp', controller.sendOtp); // 👈 Naya route
router.post('/email-login', controller.emailLogin);

module.exports = router;