const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/auth');
const moviesController = require('../controllers/moviesController');

// const ratingsController = require('../controllers/ratingsController');
// const userController = require('../controllers/userController');

// User Profile endpoints signup , login
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.post('/auth/google', authController.googleLogin);
router.get('/auth/profile', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

//Movies endpoints
router.get('/movies', authenticateToken, moviesController.handleGetAllMovies);
router.get('/movies/:id', authenticateToken,moviesController.handleGetMovieById);
router.get('/search', authenticateToken,moviesController.handleSearchMovies);

// Ratings endpoints
// router.get('/ratings', ratingsController.handleGetAllRatings);
// router.post('/ratings', ratingsController.handleAddRating);
// router.get('/ratings/:id', ratingsController.handleGetRatingById);
// router.put('/ratings/:id', ratingsController.handleUpdateRating);
// router.delete('/ratings/:id', ratingsController.handleDeleteRating);




module.exports = router;