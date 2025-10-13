import React from "react";
import { Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import SearchPage from "./pages/searchPage";
import MovieRecommendationPage from "./pages/MovieRecommendationPage";
import AuthCallback from "./components/AuthCallback";

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthCallback />} />
          <Route path="/movie/:id" element={<MovieRecommendationPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
    </AuthProvider>
      
  );
};
export default App;