const User = require('./user.model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Email bhejne ka setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret_key_123', { expiresIn: '7d' });
};

// 1. Phone Login (Waisa hi rahega)
const loginWithPhone = async (phone) => {
  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ phone });
  return { user, token: generateToken(user) };
};

// 2. Send Real OTP to Email
const sendOtpToEmail = async (email) => {
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email, name: email.split('@')[0] });

  // 6 digit ka random OTP generate karo
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minute valid

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  // Email bhejo
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'NoBroker Clone - Your Login OTP',
    text: `Aapka OTP hai: ${otp}. Ye 10 minute ke liye valid hai.`
  });

  return { message: 'OTP sent to email' };
};

// 3. Verify OTP and Login
const loginWithEmail = async (email, otp) => {
  let user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  
  if (user.otp !== otp) throw new Error('Galat OTP');
  if (user.otpExpires < new Date()) throw new Error('OTP expire ho gaya');

  // OTP clear kar do taaki dobara use na ho
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return { user, token: generateToken(user) };
};

module.exports = { loginWithPhone, sendOtpToEmail, loginWithEmail };