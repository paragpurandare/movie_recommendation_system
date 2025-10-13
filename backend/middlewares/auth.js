const jwt = require('jsonwebtoken');
require('dotenv').config();

JWT_SECRET = process.env.JWT_SECRET

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user; // Contains { id, email, name }
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name || user.username // fallback to username
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports = { authenticateToken, generateToken };