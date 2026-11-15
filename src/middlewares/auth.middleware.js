const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Token nahi mila' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_123');
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Token galat ya expire ho gaya' });
  }
};

module.exports = authMiddleware;