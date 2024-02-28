// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(session({ secret: process.env.SESSION_SECRET || 'default-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Add this middleware to log requests
app.use((req, res, next) => {
  console.log('Received request:', req.method, req.url);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rapid', { useNewUrlParser: true, useUnifiedTopology: true });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message });
});

app.use('/api/user', userRoutes);

// ... other routes and middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
