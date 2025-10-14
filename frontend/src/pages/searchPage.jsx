import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SearchIcon, FilterIcon, ArrowLeftIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import MoviesNotFound from "../components/MoviesNotFound";
import api from "../lib/axios";
import toast from "react-hot-toast";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        genre: "",
        year: "",
        rating: ""
    });

    const query = searchParams.get("query") || "";

    useEffect(() => {
        if (query) {
            searchMovies(query);
        }
    }, [query]);

    const searchMovies = async (searchQuery) => {
        setLoading(true);
        try {
            // Search movies from your backend API
            const res = await api.get(`/search?query=${encodeURIComponent(searchQuery)}`);
            setMovies(res.data);
        } catch (error) {
            toast.error("Failed to search movies");
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
        // You can implement filter logic here
    };

    const filteredMovies = movies.filter(movie => {
        if (filters.genre && movie.genre !== filters.genre) return false;
        if (filters.year && movie.release_date?.slice(0, 4) !== filters.year) return false;
        if (filters.rating && movie.vote_average < parseFloat(filters.rating)) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-focus font-semibold mb-8 transition-colors"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    Back to Movies
                </Link>
                {/* Search Results Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <SearchIcon className="w-6 h-6 text-indigo-500" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            {query ? `Search Results for "${query}"` : "Search Movies"}
                        </h1>
                    </div>

                    {query && (
                        <p className="text-gray-600">
                            Found {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <FilterIcon className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={filters.genre}
                                onChange={(e) => handleFilterChange("genre", e.target.value)}
                            >
                                <option value="">All Genres</option>
                                <option value="Action">Action</option>
                                <option value="Drama">Drama</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Horror">Horror</option>
                                <option value="Romance">Romance</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={filters.year}
                                onChange={(e) => handleFilterChange("year", e.target.value)}
                            >
                                <option value="">All Years</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={filters.rating}
                                onChange={(e) => handleFilterChange("rating", e.target.value)}
                            >
                                <option value="">Any Rating</option>
                                <option value="8">8.0+</option>
                                <option value="7">7.0+</option>
                                <option value="6">6.0+</option>
                                <option value="5">5.0+</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <svg className="animate-spin h-10 w-10 text-indigo-400 mb-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span className="text-lg text-indigo-400 font-semibold">Searching movies...</span>
                    </div>
                )}

                {/* Search Results */}
                {!loading && query && (
                    <>
                        {filteredMovies.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} showSimilarity={true} />
                                ))}
                            </div>
                        ) : (
                            <MoviesNotFound />
                        )}
                    </>
                )}

                {/* Empty State */}
                {!loading && !query && (
                    <div className="text-center py-20">
                        <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Start searching for movies</h3>
                        <p className="text-gray-500">Use the search bar above to find your favorite movies</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchPage;