const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file, where API keys and passwords are configured
require('dotenv').config();

// Create Express server
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index.route'));

// Catch 404
app.use(require('./middlewares/notFound'));

// Port assignment
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { app, server };
