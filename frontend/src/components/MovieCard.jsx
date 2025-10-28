import { useState } from "react";
import { Link } from "react-router-dom";
import { StarIcon, CalendarIcon, TagIcon, TrendingUpIcon, HeartIcon } from "lucide-react";
import PosterCard from "./PosterCard";
import api from "../lib/axios";

const MovieCard = ({ movie, showSimilarity = false }) => {
  const [showRatingSelector, setShowRatingSelector] = useState(false);
  const [selectedRating, setSelectedRating] = useState(movie.userRating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleRate(movieId, rating) {
    setIsSubmitting(true);
    setError('');
    try {
      await api.post('/ratings', {
        movieId: parseInt(movieId),
        rating: parseFloat(rating)
      }, 
      );
      setSelectedRating(rating);
      setShowRatingSelector(false);
    } catch (err) {
      setError('Failed to save rating');
      console.error('Rating error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group w-full max-w-sm">
      <Link to={`/movie/${movie.id}`}>
        <figure className="relative overflow-hidden">
          <PosterCard
            movieId={movie.id}
            title={movie.title}
            className="rounded-xl w-full md:w-64 h-96 shadow-xl object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {showSimilarity && movie.similarity_score && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <HeartIcon className="w-3 h-3" />
              {(movie.similarity_score)}% Match
            </div>
          )}
        </figure>
      </Link>

      <div className="p-4 space-y-2">
        <h2 className="font-bold text-lg text-gray-900 line-clamp-2 min-h-[3rem] leading-tight">
          {movie.title}
        </h2>

        <div className="flex flex-wrap gap-1.5">
          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <TagIcon className="w-3 h-3" />
            {movie.genre}
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <StarIcon className="w-3 h-3" />
            {movie.vote_average}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <TrendingUpIcon className="w-3 h-3" />
            {movie.popularity}
          </span>
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3" />
            {movie.release_date?.slice(0, 4)}
          </span>
        </div>

        {/* Rating Button Section */}
        <div className="mt-4 space-y-2">
          {!showRatingSelector ? (
            <button
              onClick={() => setShowRatingSelector(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {movie.userRating ? `Update Rating (${movie.userRating})` : 'Rate Movie'}
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-center gap-2">
                {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRate(movie.id, rating)}
                    disabled={isSubmitting}
                    className={`p-2 rounded-full ${selectedRating === rating
                        ? 'bg-yellow-400 text-black'
                        : 'bg-gray-200 hover:bg-yellow-200'
                      }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowRatingSelector(false)}
                className="w-full px-4 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;