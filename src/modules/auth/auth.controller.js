const authService = require('./auth.service');

const login = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const data = await authService.loginWithPhone(phone);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const emailLogin = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const data = await authService.loginWithEmail(email, otp);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

module.exports = { login, emailLogin };