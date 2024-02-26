const express = require('express');
const jobController = require('../controllers/jobController');
const isAuthenticated = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', isAuthenticated, jobController.createJob);
router.get('/user/:userId', isAuthenticated, jobController.getJobsByUser);

module.exports = router;
