import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { StarIcon, CalendarIcon, TagIcon, TrendingUpIcon } from "lucide-react";

const TMDB_API_KEY = "c7ec19ffdd3279641fb606d19ceb9bb1";

const MovieCard = ({ movie }) => {
  const [posterUrl, setPosterUrl] = useState("");

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const posterPath = res.data.poster_path;
        if (posterPath) {
          setPosterUrl(`https://image.tmdb.org/t/p/w500${posterPath}`);
        } else {
          setPosterUrl("/fallback-poster.png");
        }
      } catch {
        setPosterUrl("/fallback-poster.png");
      }
    };
    fetchPoster();
  }, [movie.id]);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="card w-full bg-base-100 shadow-xl hover:scale-105 transition-transform duration-200"
      style={{ minHeight: "420px", maxWidth: "320px" }}
    >
      <figure className="px-4 pt-4">
        <img
          src={posterUrl}
          alt={movie.title}
          className="rounded-xl h-64 object-cover w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base-content">{movie.title}</h2>
        <div className="flex flex-wrap gap-2 mt-2 items-center">
          <span className="badge badge-outline badge-lg flex items-center gap-1">
            <TagIcon className="w-4 h-4" /> {movie.genre}
          </span>
          <span className="badge badge-outline flex items-center gap-1">
            <TrendingUpIcon className="w-4 h-4" /> {movie.popularity}
          </span>
          <span className="rounded-full px-3 py-1 bg-yellow-400 text-black font-bold text-xs flex items-center gap-1">
            <StarIcon className="w-4 h-4" /> IMDB {movie.vote_average}
          </span>
          <span className="badge badge-outline flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" /> {movie.release_date}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;