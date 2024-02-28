// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const token = req.header('Authorization') || req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, '9053');

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = isAuthenticated;
