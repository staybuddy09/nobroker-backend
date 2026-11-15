const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true, sparse: true }, // sparse: multiple null allow karega
  email: { type: String, unique: true, sparse: true },
  name: { type: String },
  role: { type: String, enum: ['user', 'owner', 'admin'], default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);