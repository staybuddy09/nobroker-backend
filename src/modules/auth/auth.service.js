const User = require('./user.model');
const jwt = require('jsonwebtoken');

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
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  // 👇 Brevo API se email bhej rahe hain (Kisi bhi email pe jayega)
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender: { name: 'NoBroker Clone', email: process.env.EMAIL_USER }, // Jo email Brevo mein verify ki hai
      to: [{ email: email }],
      subject: 'NoBroker Clone - Your OTP',
      htmlContent: `<h3>Aapka OTP hai: <b>${otp}</b></h3><p>Ye 10 minute ke liye valid hai.</p>`
    })
  });

  if (!response.ok) {
    throw new Error('Email send failed');
  }

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