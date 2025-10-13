import React from "react";
import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/searchPage";
import MovieRecommendationPage from "./pages/MovieRecommendationPage";

const App = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieRecommendationPage />} />
      </Routes>
    </div>
  );
};
export default App;