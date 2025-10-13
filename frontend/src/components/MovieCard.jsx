import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { StarIcon, CalendarIcon, TagIcon, TrendingUpIcon, HeartIcon } from "lucide-react";
import PosterCard from "./PosterCard";

const MovieCard = ({ movie, showSimilarity = false }) => {

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group w-full max-w-sm"
    >
      <figure className="relative overflow-hidden">
        <PosterCard
          movieId={movie.id}
          title={movie.title}
          className="rounded-xl w-full md:w-64 h-96 shadow-xl object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Similarity Score Badge */}
        {showSimilarity && movie.similarity_score && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <HeartIcon className="w-3 h-3" />
            {(movie.similarity_score)}% Match
          </div>
        )}
      </figure>

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
      </div>
    </Link>
  );
};

export default MovieCard;