import React from "react";
import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/searchPage";
import MovieRecommendationPage from "./pages/MovieRecommendationPage";

const App = () => {
  return (
    // Your main app component code goes here i want full page to apply forest theme to all the pages so complete thing should be halloween
       <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieRecommendationPage />} />
      </Routes>
    </div>
  );
};
export default App;