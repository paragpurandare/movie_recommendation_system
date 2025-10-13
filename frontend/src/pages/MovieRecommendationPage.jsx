import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";
import MovieCard from "../components/MovieCard";

const MovieRecommendationPage = () => {
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        if (res.data.movie) {
          setMovie(res.data.movie);
          setRecommendations(res.data.recommendations || []);
        } else {
          setMovie(res.data);
          setRecommendations(res.data.recommendations || []);
        }
      } catch (error) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoaderIcon className="animate-spin text-indigo-400 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-indigo-500 hover:underline font-semibold">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Movies
          </Link>
        </div>

        {/* Selected Movie */}
        {movie && (
          <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-8 p-6 mb-10">
            <img
              src={movie.poster_path || "/fallback-poster.png"}
              alt={movie.title}
              className="rounded-xl w-52 h-72 object-cover shadow"
              onError={(e) => { e.target.src = "/fallback-poster.png"; }}
            />
            <div className="flex-1">
              <h2 className="font-bold text-2xl text-gray-900 mb-4">{movie.title}</h2>
              <div className="flex flex-wrap gap-3 mb-2">
                <span className="flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {movie.genre}
                </span>
                <span className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {movie.popularity} Popularity
                </span>
                <span className="flex items-center bg-yellow-300 text-black px-3 py-1 rounded-full text-sm font-bold">
                  IMDB {movie.vote_average}
                </span>
                <span className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {movie.release_date?.slice(0, 10)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <h2 className="mb-6 text-xl font-bold text-gray-800">Recommended Movies</h2>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendations.map((rec) => (
            <MovieCard key={rec.id} movie={rec} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendationPage;