import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
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
        console.log(res.data);
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
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-14xl mx-auto my-8 p-8 pt-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading movies...</div>}

        {movies.length === 0 && !isRateLimited && <MoviesNotFound />}

        {movies.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} setMovies={setMovies} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;