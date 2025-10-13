import { UserCircle2Icon, SearchIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight text-indigo-400">ShowMovies</Link>

        <form onSubmit={handleSearch} className="flex-1 flex justify-center mx-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
              placeholder="Search movies, tags, genres..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 w-5 h-5" />
          </div>
        </form>

        <Link to="/profile" className="ml-4">
          <UserCircle2Icon className="w-8 h-8 text-indigo-400" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;