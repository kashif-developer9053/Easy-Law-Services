const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/rapid', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const jobSchema = new mongoose.Schema({
  userId: String,
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);

// Passport.js configuration
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Registration endpoint
app.post('/api/user/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, email, phone, address, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/user/login', passport.authenticate('local'), (req, res) => {
  const { _id, firstName, lastName, email, phone, address } = req.user;
  res.status(200).json({
    success: true,
    message: 'Login successful',
    user: { _id, firstName, lastName, email, phone, address },
  });
});

// Logout endpoint
app.get('/api/user/logout', (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).json({ success: false, message: 'Logout failed' });
      }

      res.status(200).json({ success: true, message: 'Logout successful' });
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
});
// Fetch Jobs endpoint
app.get('/api/jobs/user/:userId', isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      console.error('Invalid userId:', userId);
      return res.status(400).json({ error: 'Invalid userId' });
    }

    console.log('Fetching jobs for user:', userId); // Add this line for debugging

    const userJobs = await Job.find({ userId });

    res.status(200).json({ success: true, jobs: userJobs });
  } catch (error) {
    console.error('Error fetching user jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
}

app.post('/api/jobs/post', async (req, res) => {
  try {
    const { userId, title, description, budget, location } = req.body;

    const newJob = new Job({
      userId,
      title,
      description,
      budget,
      location,
    });

    await newJob.save();

    res.status(201).json({ success: true, message: 'Job posted successfully' });
  } catch (error) {
    console.error('Error during job posting:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Fetch Jobs endpoint
app.get('/api/jobs/user/:userId', isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      console.error('Invalid userId:', userId);
      return res.status(400).json({ error: 'Invalid userId' });
    }

    console.log('Fetching jobs for user:', userId); // Add this line for debugging

    const userJobs = await Job.find({ userId });

    res.status(200).json({ success: true, jobs: userJobs });
  } catch (error) {
    console.error('Error fetching user jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Add a catch-all route for any unmatched routes
app.get('*', (req, res) => {
  res.redirect('/signin');
});

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: 'http://localhost:3000/', // Replace with your React app's URL
  credentials: true,
}));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
