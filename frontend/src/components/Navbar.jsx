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
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Title */}
          <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tight">
            ShowMovies
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="Search movies, tags, genres..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60 w-5 h-5" />
            </div>
          </form>

          {/* Profile Icon */}
          <Link to="/profile" className="btn btn-ghost btn-circle avatar">
            <UserCircle2Icon className="w-8 h-8 text-primary" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;