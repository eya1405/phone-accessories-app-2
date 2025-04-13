const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();
mongoose.set('strictQuery', true);
const app = express();
app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/auth_db')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
