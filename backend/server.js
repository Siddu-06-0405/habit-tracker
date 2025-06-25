const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const habitRoutes = require('./routes/habit.routes');
const authRoutes = require('./routes/auth.routes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error', err));

app.use('/api/habits', habitRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));