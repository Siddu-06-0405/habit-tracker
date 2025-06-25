const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  frequency: String,
}, { timestamps: true });
module.exports = mongoose.model('Habit', habitSchema);