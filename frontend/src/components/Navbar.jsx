// src/components/Navbar.jsx
import { UserCircle2Icon, SearchIcon, LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, loading } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Show loading state
  if (loading) {
    return (
      <header className="bg-gray-900 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight text-indigo-400">
            ShowMovies
          </Link>
          <div className="animate-pulse">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight text-indigo-400">
          ShowMovies
        </Link>

        <form onSubmit={handleSearch} className="flex-1 flex justify-center mx-4">
          <div className="relative w-full max-w-md">
            <label htmlFor="search" className="sr-only">Search movies, tags, genres</label>
            <input
              id="search"
              name="search"
              type="text"
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
              placeholder="Search movies, tags, genres..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 w-5 h-5" />
          </div>
        </form>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-indigo-400"
                />
              ) : (
                <UserCircle2Icon className="w-8 h-8 text-indigo-400" />
              )}
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
                title="Logout"
              >
                <LogOutIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <UserCircle2Icon className="w-8 h-8" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;