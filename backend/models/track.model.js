const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  habitId: mongoose.Schema.Types.ObjectId,
  date: String,
  completed: Boolean,
});
module.exports = mongoose.model('Track', trackSchema);