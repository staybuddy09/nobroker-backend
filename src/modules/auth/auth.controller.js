const authService = require('./auth.service');

const login = async (req, res, next) => {
  try {
    const data = await authService.loginWithPhone(req.body.phone);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const sendOtp = async (req, res, next) => {
  try {
    const data = await authService.sendOtpToEmail(req.body.email);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const emailLogin = async (req, res, next) => {
  try {
    const data = await authService.loginWithEmail(req.body.email, req.body.otp);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

module.exports = { login, sendOtp, emailLogin };