// src/components/AuthCallback.jsx
import { useAuth } from '../contexts/AuthContext';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';

const AuthCallback = () => {
    const { isAuthenticated, loading } = useAuth();

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading ShowMovies...</p>
                </div>
            </div>
        );
    }

    // Show AuthPage if not authenticated, HomePage if authenticated
    return isAuthenticated ? <HomePage /> : <AuthPage />;
};

export default AuthCallback;