import React, { useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../hooks/useAuth';
import axios from 'axios';

/**
 * AuthProvider Component
 * Manages authentication state and provides auth context to the app
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Check authentication status
   */
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/auth/me', {
        withCredentials: true,
      });
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.log('User not authenticated');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign up with email, password, and background info
   */
  const signup = useCallback(async (formData) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/signup', formData, {
        withCredentials: true,
      });
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Sign in with email and password
   */
  const signin = useCallback(async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(
        '/api/auth/signin',
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Sign in failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Sign out
   */
  const signout = useCallback(async () => {
    try {
      await axios.post('/api/auth/signout', {}, { withCredentials: true });
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  }, []);

  /**
   * Update user background information
   */
  const updateBackground = useCallback(async (backgroundData) => {
    try {
      setError(null);
      const response = await axios.put('/api/auth/profile', backgroundData, {
        withCredentials: true,
      });
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Update failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signout,
    updateBackground,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
