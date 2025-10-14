// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : formData;

            const response = await api.post(endpoint, payload);

            login(response.data.token, response.data.user);
            toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    // Simple Google OAuth success handler
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setLoading(true);

            // Send Google credential to backend
            const response = await api.post('/auth/google', {
                credential: credentialResponse.credential
            });

            login(response.data.token, response.data.user);
            toast.success('Google login successful!');
            navigate('/');
        } catch (error) {
            console.error('Google login error:', error);
            toast.error('Google login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        toast.error('Google login failed');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isLogin ? 'Sign in to your account' : 'Create new account'}
                    </h2>
                </div>

                {/* Manual Login/Register Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label htmlFor='name' className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    id='name'
                                    name='name'
                                    type="text"
                                    required={!isLogin}
                                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    autoComplete="name"
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor='email' className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id='email'
                                name='email'
                                type="email"
                                required
                                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                autoComplete="email"
                            />
                        </div>

                        <div>
                            <label htmlFor='password' className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id='password'
                                name='password'
                                type="password"
                                required
                                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Simple Google OAuth Button */}
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            theme="outline"
                            size="large"
                            // Remove useOneTap to fix CSP and postMessage errors
                            // useOneTap={false}
                            text="signin_with"
                            shape="rectangular"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-indigo-600 hover:text-indigo-500"
                        >
                            {isLogin
                                ? "Don't have an account? Sign up"
                                : "Already have an account? Sign in"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;