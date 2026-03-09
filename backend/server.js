const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const confessionRoutes = require('./routes/confessionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());

// Routes
app.use('/api/confessions', confessionRoutes);

app.get('/', (req, res) => {
  res.send('Dev Confession API IS RUNNING...');
});

// Database Connection (dùng chung cho toàn bộ api)
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, {
      // tuỳ chọn tối ưu: useNewUrlParser, useUnifiedTopology được bật mặc định >6
    })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
