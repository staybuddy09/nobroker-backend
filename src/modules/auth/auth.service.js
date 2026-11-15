const User = require('./user.model');
const jwt = require('jsonwebtoken');
const { Resend } = require('resend');

// Resend Setup
const resend = new Resend(process.env.RESEND_API_KEY || 're_YOUR_KEY_HERE');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret_key_123', { expiresIn: '7d' });
};

const loginWithPhone = async (phone) => {
  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ phone });
  return { user, token: generateToken(user) };
};

const sendOtpToEmail = async (email) => {
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email, name: email.split('@')[0] });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await user.save();

  // Resend se email bhej rahe hain (Render par ye kabhi block nahi hoga)
  await resend.emails.send({
    from: 'onboarding@resend.dev', // Testing ke liye ye default de rahe hain
    to: email,
    subject: 'NoBroker Clone - Your OTP',
    text: `Aapka OTP hai: ${otp}. Ye 10 minute ke liye valid hai.`
  });

  return { message: 'OTP sent' };
};

const loginWithEmail = async (email, otp) => {
  let user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  
  if (user.otp !== otp) throw new Error('Galat OTP');
  if (user.otpExpires < new Date()) throw new Error('OTP expire ho gaya');

  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return { user, token: generateToken(user) };
};

module.exports = { loginWithPhone, sendOtpToEmail, loginWithEmail };