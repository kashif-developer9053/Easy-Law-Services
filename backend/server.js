const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport'); // Import passport
const User = require('./models/userModel'); // Import the User model
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes'); // Import the jobRoutes

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));
app.use(session({ secret: process.env.SESSION_SECRET || 'default-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rapid', { useNewUrlParser: true, useUnifiedTopology: true });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use('/api/user', userRoutes);
app.use('/api/jobs', jobRoutes);

// ... other routes and middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
