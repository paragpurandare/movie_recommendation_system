import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUi";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import MovieCard from "../components/MovieCard";
import MoviesNotFound from "../components/MoviesNotFound";


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        // console.log(res.data);
        setMovies(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching movies");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      {isRateLimited && (
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <RateLimitedUI />
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="text-lg text-base-content/70">Loading movies...</p>
          </div>
        )}

        {!loading && movies.length === 0 && !isRateLimited && <MoviesNotFound />}

        {!loading && movies.length > 0 && !isRateLimited && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-primary mb-2">Featured Movies</h1>
              <p className="text-base-content/70">Discover the latest and greatest films</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};
export default HomePage;