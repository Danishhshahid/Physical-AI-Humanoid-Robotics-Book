import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from './Auth.module.css';

/**
 * SigninForm Component
 * Simple email and password login
 */
export function SigninForm({ onSuccess, onToggle }) {
  const { signin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError('Email is required');
      return;
    }

    if (!formData.password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    try {
      await signin(formData.email, formData.password);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authForm}>
      <h2>Welcome Back</h2>
      <p className={styles.subtitle}>Sign in to access your personalized learning path</p>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Your password"
            required
          />
        </div>

        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <p className={styles.toggleText}>
        Don't have an account?{' '}
        <button onClick={onToggle} className={styles.toggleLink}>
          Sign up
        </button>
      </p>
    </div>
  );
}
