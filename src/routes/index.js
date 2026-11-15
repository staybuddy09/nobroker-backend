const express = require('express');
const propertyRoutes = require('../modules/property/property.routes');
const authRoutes = require('../modules/auth/auth.routes'); // Naya import
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Modular route chal raha hai! ✅' });
});

router.use('/properties', propertyRoutes);
router.use('/auth', authRoutes); // Auth connect karo

module.exports = router;