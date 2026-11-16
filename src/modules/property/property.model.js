const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  bhk: { type: Number, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  locality: { type: String },
  type: { type: String, enum: ['rent', 'sale'], required: true },
  imageUrl: { type: String }, // 👈 Ye line sabse zaroori hai
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);