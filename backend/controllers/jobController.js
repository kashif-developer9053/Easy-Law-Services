const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const userController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, phone, address, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ firstName, lastName, email, phone, address, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: (req, res) => {
    const { _id, firstName, lastName, email, phone, address } = req.user;
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: { _id, firstName, lastName, email, phone, address },
    });
  },

  logout: (req, res) => {
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
  },

  getUserDashboard: async (req, res) => {
    try {
      const userId = req.user._id;

      // Fetch user details
      const user = await User.findById(userId);

      // Fetch jobs for the user
      const userJobs = await Job.find({ userId });

      res.status(200).json({ success: true, message: 'User dashboard', user, jobs: userJobs });
    } catch (error) {
      console.error('Error fetching user dashboard:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = userController;
