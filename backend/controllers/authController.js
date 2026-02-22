// controllers/authController.js
const pool = require('../config/sql_db');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/auth');
const  {v4: uuidv4}  = require('uuid');
const crypto = require('crypto'); // Built-in Node.js module

// Function to generate unique 32-bit integer from UUID
const generateUniqueIntegerId = () => {
    // Generate UUID bytes
    const uuidBytes = crypto.randomBytes(16); // 16 bytes = 128 bits (UUID size)
    
    // Take first 4 bytes and convert to 32-bit unsigned integer
    const thirtyTwoBitId = uuidBytes.readUInt32BE(0); // Big Endian, positive integer
    
    return thirtyTwoBitId;
};

// Regular Login with email/password
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (!user.rows[0].password) {
            return res.status(400).json({ message: 'Please login with Google' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = generateToken(user.rows[0]);

        res.status(200).json({
            token,
            user: {
                id: user.rows[0].id,
                email: user.rows[0].email,
                name: user.rows[0].name || user.rows[0].username,
                avatar_url: user.rows[0].avatar_url
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
}; 

// Google OAuth Login
// controllers/authController.js - Add this to handle Google OAuth
exports.googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        // Decode Google JWT on backend
        const payload = JSON.parse(Buffer.from(credential.split('.')[1], 'base64').toString());

        const { sub: googleId, email, name, picture: avatar } = payload;

        let user = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR google_id = $2',
            [email, googleId]
        );

        if (user.rows.length === 0) {
            // Generate unique ID for new user
            const uniqueId = generateUniqueIntegerId();

            const newUser = await pool.query(
                'INSERT INTO users (id, email, name, google_id, avatar_url, username, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
                [uniqueId, email, name, googleId, avatar, name]
            );
            user = newUser;
        }

        const token = generateToken(user.rows[0]);

        res.json({
            token,
            user: {
                id: user.rows[0].id,
                email: user.rows[0].email,
                name: user.rows[0].name,
                avatar_url: user.rows[0].avatar_url
            }
        });
    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({ message: 'Google login failed' });
    }
};

// Register with email/password
exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Generate unique integer ID from UUID bytes
        const uniqueId = generateUniqueIntegerId();

        const newUser = await pool.query(
            'INSERT INTO users (id, email, password, name, username, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
            [uniqueId, email, hashedPassword, name, name]
        );

        const token = generateToken(newUser.rows[0]);

        res.json({
            token,
            user: {
                id: newUser.rows[0].id,
                email: newUser.rows[0].email,
                name: newUser.rows[0].name
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
};