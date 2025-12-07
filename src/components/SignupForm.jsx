import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from './Auth.module.css';

/**
 * Signup Component
 * Collects user info including software and hardware background
 */
export function SignupForm({ onSuccess, onToggle }) {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // Multi-step form

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    softwareBackground: '',
    hardwareBackground: '',
    experience: '',
    interests: [],
  });

  const softwareOptions = [
    'Beginner - No programming experience',
    'Intermediate - Some Python/JavaScript experience',
    'Advanced - Professional software developer',
    'Expert - ML/AI specialist',
  ];

  const hardwareOptions = [
    'Beginner - No robotics experience',
    'Intermediate - Built simple robots',
    'Advanced - Experience with ROS/embedded systems',
    'Expert - Professional roboticist',
  ];

  const experienceOptions = [
    'Student',
    'Hobbyist',
    'Professional',
    'Researcher',
  ];

  const interestOptions = [
    'Humanoid Robotics',
    'Vision & Perception',
    'Motion Planning',
    'Machine Learning',
    'Hardware Design',
    'Simulation',
    'Real-world Deployment',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleCheckboxChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.softwareBackground) {
      setError('Please select your software background');
      return false;
    }
    if (!formData.hardwareBackground) {
      setError('Please select your hardware background');
      return false;
    }
    if (!formData.experience) {
      setError('Please select your experience level');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        softwareBackground: formData.softwareBackground,
        hardwareBackground: formData.hardwareBackground,
        experience: formData.experience,
        interests: formData.interests,
      });
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authForm}>
      <h2>Create Your Account</h2>
      <p className={styles.subtitle}>
        {step === 1
          ? 'Get started with your account details'
          : 'Tell us about your background'}
      </p>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>
        {step === 1 ? (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
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
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="At least 8 characters"
                required
              />
              <small>Must be at least 8 characters long</small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" className={styles.btn} disabled={loading}>
              Next: Your Background
            </button>
          </>
        ) : (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="softwareBackground">
                Software Development Background *
              </label>
              <select
                id="softwareBackground"
                name="softwareBackground"
                value={formData.softwareBackground}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your level...</option>
                {softwareOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <small>This helps us personalize the content difficulty</small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="hardwareBackground">
                Hardware & Robotics Background *
              </label>
              <select
                id="hardwareBackground"
                name="hardwareBackground"
                value={formData.hardwareBackground}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your level...</option>
                {hardwareOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <small>Helps us recommend appropriate robotics resources</small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="experience">Current Role/Experience *</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your role...</option>
                {experienceOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Topics of Interest</label>
              <div className={styles.checkboxGroup}>
                {interestOptions.map(interest => (
                  <label key={interest} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleCheckboxChange(interest)}
                    />
                    {interest}
                  </label>
                ))}
              </div>
              <small>Select topics we should focus on for you</small>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button
                type="submit"
                className={styles.btn}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </>
        )}
      </form>

      <p className={styles.toggleText}>
        Already have an account?{' '}
        <button onClick={onToggle} className={styles.toggleLink}>
          Sign in
        </button>
      </p>
    </div>
  );
}
