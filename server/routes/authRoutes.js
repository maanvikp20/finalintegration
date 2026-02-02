const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  logout
} = require('../controllers/authController');

// POST /api/auth/register - Register new user
router.post('/register', register);

// POST /api/auth/login - Login user
router.post('/login', login);

// GET /api/auth/profile/:userId - Get user profile
router.get('/profile/:userId', getProfile);

// PUT /api/auth/profile/:userId - Update user profile
router.put('/profile/:userId', updateProfile);

// POST /api/auth/logout - Logout user
router.post('/logout', logout);

module.exports = router;
