const User = require('./user.model');
const jwt = require('jsonwebtoken');

// Phone Login
const loginWithPhone = async (phone) => {
  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ phone });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret_key_123', { expiresIn: '7d' });
  return { user, token };
};

// Email Login (OTP 1234)
const loginWithEmail = async (email, otp) => {
  if (otp !== '1234') throw new Error('Galat OTP');
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email, name: email.split('@')[0] });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret_key_123', { expiresIn: '7d' });
  return { user, token };
};

module.exports = { loginWithPhone, loginWithEmail };