const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');
// const ratingsController = require('../controllers/ratingsController');
// const userController = require('../controllers/userController');

//Movies endpoints
router.get('/movies', moviesController.handleGetAllMovies);
router.get('/movies/:id', moviesController.handleGetMovieById);
router.get('/search', moviesController.handleSearchMovies);

// Ratings endpoints
// router.get('/ratings', ratingsController.handleGetAllRatings);
// router.post('/ratings', ratingsController.handleAddRating);
// router.get('/ratings/:id', ratingsController.handleGetRatingById);
// router.put('/ratings/:id', ratingsController.handleUpdateRating);
// router.delete('/ratings/:id', ratingsController.handleDeleteRating);

// User Profile endpoints signup , login
// router.post('/user/signup', userController.handleUserSignup);
// router.post('/user/login', userController.handleUserLogin);


module.exports = router;