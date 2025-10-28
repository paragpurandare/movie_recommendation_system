import React from "react";
import { Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import SearchPage from "./pages/searchPage";
import MovieRecommendationPage from "./pages/MovieRecommendationPage";
import AuthCallback from "./components/AuthCallback";
import RatingsPage from "./pages/ratingsPage"

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthCallback />} />
          <Route path="/movie/:id" element={<MovieRecommendationPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/ratings" element={<RatingsPage />} />
        </Routes>
    </AuthProvider>
      
  );
};
export default App;