/**
 * Backend API Implementation Example
 * 
 * This is a reference implementation for the authentication API endpoints.
 * Use with Express.js and a database (MongoDB, PostgreSQL, etc.)
 * 
 * Install dependencies:
 * npm install express better-auth bcryptjs cors dotenv jsonwebtoken
 */

// Import dependencies
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ============================================
// AUTHENTICATION ROUTES
// ============================================

/**
 * POST /api/auth/signup
 * Create a new user account with background information
 * 
 * Request Body:
 * {
 *   name: string,
 *   email: string,
 *   password: string,
 *   softwareBackground: string,
 *   hardwareBackground: string,
 *   experience: string,
 *   interests: string[]
 * }
 */
router.post('/api/auth/signup', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      softwareBackground,
      hardwareBackground,
      experience,
      interests,
    } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      softwareBackground,
      hardwareBackground,
      experience,
      interests: interests || [],
      joinedAt: new Date(),
      bonusPointsEarned: 50, // Award 50 bonus points
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        softwareBackground: user.softwareBackground,
        hardwareBackground: user.hardwareBackground,
        experience: user.experience,
        interests: user.interests,
        joinedAt: user.joinedAt,
        bonusPointsEarned: 50,
      },
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

/**
 * POST /api/auth/signin
 * Login with email and password
 * 
 * Request Body:
 * {
 *   email: string,
 *   password: string
 * }
 */
router.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        softwareBackground: user.softwareBackground,
        hardwareBackground: user.hardwareBackground,
        experience: user.experience,
        interests: user.interests,
        joinedAt: user.joinedAt,
      },
      token,
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Sign in failed' });
  }
});

/**
 * POST /api/auth/signout
 * Logout the user
 */
router.post('/api/auth/signout', (req, res) => {
  res.clearCookie('authToken');
  res.json({ success: true });
});

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
router.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        softwareBackground: user.softwareBackground,
        hardwareBackground: user.hardwareBackground,
        experience: user.experience,
        interests: user.interests,
        joinedAt: user.joinedAt,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to get user' });
  }
});

/**
 * PUT /api/auth/profile
 * Update user background information
 * 
 * Request Body:
 * {
 *   softwareBackground?: string,
 *   hardwareBackground?: string,
 *   experience?: string,
 *   interests?: string[]
 * }
 */
router.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const {
      softwareBackground,
      hardwareBackground,
      experience,
      interests,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (softwareBackground) user.softwareBackground = softwareBackground;
    if (hardwareBackground) user.hardwareBackground = hardwareBackground;
    if (experience) user.experience = experience;
    if (interests) user.interests = interests;

    await user.save();

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        softwareBackground: user.softwareBackground,
        hardwareBackground: user.hardwareBackground,
        experience: user.experience,
        interests: user.interests,
        joinedAt: user.joinedAt,
      },
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// ============================================
// USER SCHEMA (MONGODB EXAMPLE)
// ============================================

/**
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  softwareBackground: String,
  hardwareBackground: String,
  experience: String,
  interests: [String],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  bonusPointsEarned: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('User', userSchema);
*/

// ============================================
// SETUP EXAMPLE
// ============================================

/**
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Database connection
mongoose.connect(process.env.MONGODB_URI);

// Routes
app.use(authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

module.exports = router;
