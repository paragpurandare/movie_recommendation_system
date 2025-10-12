const pool = require('../config/sql_db');
const { fastApiRecommendationsClient, fastApiPersonalizeClient } = require('../config/axios');

exports.handleGetAllMovies = async (req, res) => {
    // If userId is not present, fetch all top movies OR if User is new and Has no Ratings
    // Query for top 20 movies by IMDB, vote count, popularity
    const topMoviesQuery = `
        SELECT id, title, release_date, genre, vote_average, vote_count, popularity
        FROM movies
        ORDER BY vote_average DESC, vote_count DESC, popularity DESC
        LIMIT 20;
    `;
    //Fetch movies with Personalize if userId is present but only if User has ratings record
    const userId = req.query.userId;
    try {
        if (userId) {
            const userRatings = await pool.query('SELECT * FROM ratings WHERE user_id = $1', [userId]);
            if (userRatings.rows.length > 0) {
                try {
                    const response = await fastApiPersonalizeClient.get('/', {
                        params: { user_id: userId }
                    });
                    return res.status(200).json(response.data);
                } catch (error) {
                    console.error('Error fetching personalized recommendations:', error);
                    //fallback to top movies if error
                }
            }
        }
        const topMovies = await pool.query(topMoviesQuery);
        return res.status(200).json(topMovies.rows);
    }
    catch (error) {
        console.error('Error fetching movies', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.handleGetMovieById = async (req, res) => {
    const movieId = req.params.id;
    try {
        const movie = await pool.query('SELECT * FROM movies WHERE id = $1', [movieId]);
        if (movie.rows.length === 0) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        const recommendations = await fastApiRecommendationsClient.get(`/movie/${movieId}`, {

            params: { movie_id: movieId }
        });
        movie.rows[0].recommendations = recommendations.data.recommendations;
        return res.status(200).json(movie.rows[0]);
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.handleSearchMovies = async (req, res) => {
    // Get the search query from the frontend (e.g., ?query=Avengers or ?query=Love,romance,life)
    const searchQuery = req.query.query;
    if (!searchQuery) {
        return res.status(400).json({ message: 'Search query is required.' });
    }

    try {
        // Call FastAPI search endpoint
        const response = await fastApiRecommendationsClient.get('/search', {
            params: { query: searchQuery }
        });

        // Assuming FastAPI returns { recommendations: [...] }
        return res.status(200).json(response.data.recommendations);
    } catch (error) {
        console.error('Error fetching search recommendations:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
        