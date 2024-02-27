// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/dashboard', isAuthenticated, userController.getUserDashboard);

module.exports = router;
