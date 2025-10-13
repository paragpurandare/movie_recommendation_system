import { Link } from "react-router-dom";
import { UserCircle2Icon, SearchIcon } from "lucide-react";
import { useState } from "react";

const Navbar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(search);
    // Optionally, navigate to a search results page
    // navigate(`/search?query=${encodeURIComponent(search)}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-base-300 border-b border-primary/20 shadow-lg backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link
            to="/"
            className="text-3xl font-bold text-primary hover:text-primary-focus transition-colors font-mono tracking-tight flex items-center gap-2"
          >
            <span className="text-4xl">🎬</span>
            ShowMovies
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                className="input input-bordered w-full pl-12 pr-4 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Search movies, genres, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5" />
            </div>
          </form>

          <Link
            to="/profile"
            className="btn btn-ghost btn-circle hover:bg-primary/20 transition-all"
          >
            <UserCircle2Icon className="w-8 h-8 text-primary" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;