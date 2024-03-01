// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  // Extract token from Authorization header or request body
  const token = req.header('Authorization')?.split(' ')[1] || req.body.token;
  require('dotenv').config();

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    // Verify the token
// authMiddleware.js
const decoded = jwt.verify(token, process.env.JWT_SECRET); // Update with your actual secret

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
}

module.exports = isAuthenticated;
