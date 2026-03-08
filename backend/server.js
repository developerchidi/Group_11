const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const confessionRoutes = require('./routes/confessionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/confessions', confessionRoutes);

app.get('/', (req, res) => {
  res.send('Dev Confession API IS RUNNING...');
});

// Database Connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
