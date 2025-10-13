import { useEffect, useState } from "react";
import axios from "axios";

const TMDB_API_KEY = "c7ec19ffdd3279641fb606d19ceb9bb1";

const PosterCard = ({ movieId, title, className = "" }) => {
    const [posterUrl, setPosterUrl] = useState("");

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
            }
        };
        fetchPoster();
    }, [movieId]);

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