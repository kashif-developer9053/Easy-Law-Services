const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('../config/passport');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, email, phone, address, password: hashedPassword });
    await user.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return next(err);
    }

    if (!user) {
      console.error('Login failed:', info.message);
      return res.status(401).json({ success: false, message: info.message });
    }

    // Generate JWT token
    // userController.js
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});


    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        // Add other user properties as needed
      },
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).json({ success: false, message: 'Logout failed' });
      }

      // Clear the token cookie on logout
      res.clearCookie('token');

      res.status(200).json({ success: true, message: 'Logout successful' });
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};

exports.getUserDashboard = (req, res) => {
  res.json({ success: true, user: req.user });
};
