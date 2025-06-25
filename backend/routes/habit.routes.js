const router = require('express').Router();
const auth = require('../middleware/auth');
const { createHabit, getHabits, trackHabit, getTracking } = require('../controllers/habit.controller');
router.use(auth);
router.post('/', createHabit);
router.get('/', getHabits);
router.post('/:id/track', trackHabit);
router.get('/:id/tracking', getTracking);
module.exports = router;