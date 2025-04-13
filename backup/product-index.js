const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.get('/', (req, res) => res.send('Product service running'));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
