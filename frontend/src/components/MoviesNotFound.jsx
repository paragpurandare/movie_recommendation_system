import { FilmIcon } from "lucide-react";
import { Link } from "react-router-dom";

const MoviesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <FilmIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No movies found</h3>
      <p className="text-base-content/70">
        Ready to discover something new? Try searching for a movie or check back later for recommendations!
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default MoviesNotFound;