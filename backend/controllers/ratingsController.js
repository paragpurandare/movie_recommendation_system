const pool = require('../config/sql_db');

const { fastApiRecommendationsClient, fastApiPersonalizeClient } = require('../config/axios');
const { parse } = require('dotenv');

// now will get all ratings for all the movies by particualr user, and we dont need to fetch DB for user id, as we will contain 
//authorization header along with bearer token
exports.handleGetAllRatings = async (req, res) => {
    try {
        const userId = parseInt(req.user.id);
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const ratingsQuery = 'SELECT * FROM ratings WHERE userid = $1';
        const ratingsResult = await pool.query(ratingsQuery, [userId]);
        const ratings = ratingsResult.rows;

        res.status(200).json({ ratings });
    } catch (error) {
        console.error('Error fetching all ratings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// now will get particular movie rating by particualr user, and we dont need to fetch DB for user id, as we will contain
//authorization header along with bearer token

exports.handleGetRatingById = async (req, res) => {
    try {
        const userId = parseInt(req.user.id || req.body.userId); // Get userId from token or request body
        const movieId = parseInt(req.params.movieId);

        if (!userId || !movieId) {
            return res.status(400).json({ error: 'User ID and Movie ID are required' });
        }

        const ratingQuery = 'SELECT * FROM ratings WHERE userid = $1 AND movieid = $2';
        const ratingResult = await pool.query(ratingQuery, [userId, movieId]);

        if (ratingResult.rows.length === 0) {
            return res.status(404).json({ error: 'Rating not found' });
        }

        const rating = ratingResult.rows[0];
        res.status(200).json({ rating });
    } catch (error) {
        console.error('Error fetching movie rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// now will add rating for particular movie by particualr user, and we dont need to fetch DB for user id, as we will contain
//authorization header along with bearer token

exports.handleAddRating = async (req, res) => {
    try {
        const userId = parseInt(req.user.id || req.body.userId); // Get userId from token or request body
        const movieId = parseInt(req.body.movieId);
        let rating = parseFloat(req.body.rating);

        if (!userId || !movieId || rating == null) {
            return res.status(400).json({ error: 'User ID, Movie ID, and rating are required' });
        }

        const insertQuery = 'INSERT INTO ratings (userid, movieid, rating) VALUES ($1, $2, $3) RETURNING *';
        const insertResult = await pool.query(insertQuery, [userId, movieId, rating]);
        const newRating = insertResult.rows[0];

        res.status(201).json({ rating: newRating });
    }
    catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// now will update rating by id

exports.handleUpdateRating = async (req, res) => {
    try {
        const userId = parseInt(req.user.id || req.body.userId); // Get userId from token or request body
        const movieId = parseInt(req.params.movieId);
        let newRatingValue = parseFloat(req.body.rating);

        if (!userId || !movieId || newRatingValue == null) {
            return res.status(400).json({ error: 'User ID, Movie ID, and new rating are required' });
        }

        const updateQuery = 'UPDATE ratings SET rating = $1 WHERE userid = $2 AND movieid = $3 RETURNING *';
        const updateResult = await pool.query(updateQuery, [newRatingValue, userId, movieId]);
        
        if (updateResult.rows.length === 0) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        const updatedRating = updateResult.rows[0];
        
        res.status(200).json({ rating: updatedRating });
    }
    catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// now will delete rating by id

exports.handleDeleteRating = async (req, res) => {
    try {
        const userId = parseInt(req.user.id || req.body.userId); // Get userId from token or request body
        const movieId = parseInt(req.params.movieId);
        
        if (!userId || !movieId) {
            return res.status(400).json({ error: 'User ID and Movie ID are required' });
        }

        const deleteQuery = 'DELETE FROM ratings WHERE userid = $1 AND movieid = $2 RETURNING *';
        const deleteResult = await pool.query(deleteQuery, [userId, movieId]);
        
        if (deleteResult.rows.length === 0) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        res.status(200).json({ message: 'Rating deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

