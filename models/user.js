const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // vai guardar hash depois
  role: { type: String, default: 'user' },   // ex: user, admin
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
