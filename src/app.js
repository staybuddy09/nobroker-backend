const express = require('express');
const cors = require('cors'); // 👈 CORS import kiya
const apiRoutes = require('./routes');
const notFound = require('./middlewares/notFound.middleware');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors()); // 👈 CORS enable kiya (mobile app ke liye)
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'NoBroker Clone API is running 🚀' });
});

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;