const express = require('express');
const controller = require('./auth.controller');
const router = express.Router();

router.post('/login', controller.login);
router.post('/email-login', controller.emailLogin); // Naya Email route

module.exports = router;