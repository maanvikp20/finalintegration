const express = require('express');
const router = express.Router();

const {signup, login} = require('../controllers/authController');
const {requireAuth} = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;