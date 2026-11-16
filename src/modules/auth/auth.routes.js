const express = require('express');
const controller = require('./property.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.detail);

// 👇 Image upload ka naya route (auth zaroori hai)
router.post('/upload', authMiddleware, upload.single('image'), controller.uploadImage);

router.post('/', authMiddleware, controller.create);

module.exports = router;