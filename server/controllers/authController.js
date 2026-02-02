const User = require('../models/User');

// Register new user
const register = (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    const errors = User.validate({ username, email, password }, false);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    // Create user
    const result = User.create({ username, email, password });

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    setTimeout(() => {
      res.status(201).json({
        message: 'User registered successfully',
        user: result
      });
    }, 300);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Login user
const login = (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const errors = User.validate({ email, password }, true);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    // Attempt login
    const user = User.login(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    setTimeout(() => {
      res.status(200).json({
        message: 'Login successful',
        user: user
      });
    }, 300);
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

// Get current user profile
const getProfile = (req, res) => {
  try {
    const { userId } = req.params;

    const user = User.getById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

// Update user profile
const updateProfile = (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    // Validate input
    const errors = User.validate({ username, email, password }, false);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    // Update user
    const result = User.update(userId, { username, email, password });

    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    setTimeout(() => {
      res.status(200).json({
        message: 'Profile updated successfully',
        user: result
      });
    }, 300);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Logout (client-side only in this implementation)
const logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  logout
};
