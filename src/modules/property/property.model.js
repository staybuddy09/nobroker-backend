const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  bhk: { type: Number, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  locality: { type: String },
  type: { type: String, enum: ['rent', 'sale'], required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // 👈 Ye add kiya
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);