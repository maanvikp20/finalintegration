const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Auth Controller
 * --> Signup/Login
 * --> Issues JWT Tokens
 */

function signToken(user) {
  // JWT best practices: use 'sub' for subject (user id)
  return jwt.sign(
    {email: user.email, sub: user._id},
    process.env.JWT_SECRET,
    {subject: String(user._id), expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
  )
}

async function signup(req, res, next) {
  try {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({message: "Name, email, and password are required"});
    }

    const existing = await User.findOne({email: email.toLowerCase()});
    if (existing) return res.status(409).json({message: "Email already in use"});

    const passwordHash = await bcrypt.hash(password, 12);

    const created = await User.create ({
      name,
      email: email.toLowerCase(),
      passwordHash
    });

    const token = signToken(created);

    res.status(201).json({
      data: {
        token,
        user: {id: created._id, name: created.name, email: created.email}
      }
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const {email, password} = req.body;

    // checks for missing fields
    if (!email || !password) {
      return res.status(400).json({error: "Email and password are required"});
    }

    // checks if not existing user
    const user = await User.findOne({email: email.toLowerCase()});
    if (!user) return res.status(401).json({error: "Invalid email or password"});

    // verifies correct credentials
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) return res.status(404).json({error: "Invalid email or password"});

    // Issues JWT token
    const token = signToken(user);

    res.status(200).json({
      data: {
        token,
        user: {id: user._id, name: user.name, email: user.email}
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {signup, login};