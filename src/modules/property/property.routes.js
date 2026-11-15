const express = require('express');
const controller = require('./property.controller');
const authMiddleware = require('../../middlewares/auth.middleware'); // 👈 Import kiya

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.detail);

// 👇 Yahan authMiddleware laga diya, ab bina token koi add nahi kar sakta
router.post('/', authMiddleware, controller.create); 

module.exports = router;