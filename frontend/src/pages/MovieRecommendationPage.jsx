import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { ArrowLeftIcon, StarIcon, CalendarIcon, TagIcon, TrendingUpIcon } from "lucide-react";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import PosterCard from "../components/posterCard";

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
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="text-lg text-base-content/70">Loading movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-focus font-semibold mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Movies
        </Link>

        {movie && (
          <div className="bg-base-100 rounded-2xl shadow-2xl p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <PosterCard
                  movieId={movie.id}
                  title={movie.title}
                  className="rounded-xl w-full md:w-64 h-96 shadow-xl"
                />
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-primary mb-3">{movie.title}</h1>
                  <p className="text-base-content/70 text-lg">Movie Details</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="badge badge-primary badge-lg gap-2">
                    <TagIcon className="w-4 h-4" />
                    {movie.genre}
                  </span>
                  <span className="badge badge-accent badge-lg gap-2">
                    <StarIcon className="w-4 h-4" />
                    {movie.vote_average} IMDB
                  </span>
                  <span className="badge badge-outline badge-lg gap-2">
                    <TrendingUpIcon className="w-4 h-4" />
                    {movie.popularity}
                  </span>
                  <span className="badge badge-outline badge-lg gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    {movie.release_date?.slice(0, 4)}
                  </span>
                </div>

                {movie.overview && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-base-content/200">{movie.overview}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Recommended Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendations.map((rec) => (
                <MovieCard key={rec.id} movie={rec} showSimilarity={true} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MovieRecommendationPage;