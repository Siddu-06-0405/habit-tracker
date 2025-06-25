const Habit = require('../models/habit.model');
const Track = require('../models/track.model');
exports.createHabit = async (req, res) => {
  const habit = await Habit.create({ ...req.body, userId: req.user.id });
  res.json(habit);
};
exports.getHabits = async (req, res) => {
  const habits = await Habit.find({ userId: req.user.id });
  res.json(habits);
};
exports.trackHabit = async (req, res) => {
  const date = new Date().toISOString().split('T')[0];
  const track = await Track.findOneAndUpdate(
    { userId: req.user.id, habitId: req.params.id, date },
    { completed: true },
    { upsert: true, new: true }
  );
  res.json(track);
};
exports.getTracking = async (req, res) => {
  const tracking = await Track.find({ userId: req.user.id, habitId: req.params.id });
  res.json(tracking);
};