import { useEffect, useState } from "react";
import axios from "axios";

const TMDB_API_KEY = "c7ec19ffdd3279641fb606d19ceb9bb1";

const PosterCard = ({ movieId, title, className = "" }) => {
    const [posterUrl, setPosterUrl] = useState(null); // Changed from "" to null
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPoster = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
                );
                const posterPath = res.data.poster_path;
                setPosterUrl(posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : "/fallback-poster.png");
            } catch {
                setPosterUrl("/fallback-poster.png");
            } finally {
                setLoading(false);
            }
        };
        fetchPoster();
    }, [movieId]);

    // Don't render img if posterUrl is null/empty
    if (loading || !posterUrl) {
        return (
            <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
                <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
            </div>
        );
    }

    return (
        <img
            src={posterUrl}
            alt={title}
            className={`object-cover ${className}`}
            onError={(e) => { e.target.src = "/fallback-poster.png"; }}
        />
    );
};

export default PosterCard;