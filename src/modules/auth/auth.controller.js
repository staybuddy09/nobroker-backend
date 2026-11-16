const authService = require('./auth.service');

const login = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone) throw new Error('Phone number required');
    const data = await authService.loginWithPhone(phone);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error('Email required');
    const data = await authService.sendOtpToEmail(email);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const emailLogin = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) throw new Error('Email and OTP required');
    const data = await authService.loginWithEmail(email, otp);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) throw new Error('Google Token missing');
    const data = await authService.loginWithGoogle(idToken);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

module.exports = { login, sendOtp, emailLogin, googleLogin };