const express = require('express');
const controller = require('./property.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // 👈 Naya

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.detail);

// 👇 Naya Image Upload wala route (auth zaroori hai)
router.post('/upload', authMiddleware, upload.single('image'), controller.uploadImage);

// Property Add karne wala route
router.post('/', authMiddleware, controller.create); 

module.exports = router;