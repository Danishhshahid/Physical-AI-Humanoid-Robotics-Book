// Chatbot Configuration
// This file handles API endpoint configuration for different environments

const getChatbotConfig = () => {
  // Check if running in browser
  if (typeof window === 'undefined') {
    return {
      apiEndpoint: process.env.CHATBOT_API_URL || 'http://localhost:8000',
    };
  }

  // Try to get from window object first (set by server or build)
  if (window.__CHATBOT_CONFIG__) {
    return window.__CHATBOT_CONFIG__;
  }

  const isProduction = window.location.hostname === 'physical-ai-humanoid-robotics-book-tan.vercel.app' ||
    window.location.hostname.includes('vercel.app');

  // Default configuration based on environment
  let apiEndpoint = 'https://physical-ai-humanoid-robotics-book-rd2d.onrender.com'; // Default to production

  if (isDevelopment) {
    // Local development
    apiEndpoint = 'http://localhost:8000';
  } else if (isProduction) {
    // Explicit production URL
    apiEndpoint = 'https://physical-ai-humanoid-robotics-book-rd2d.onrender.com';
  }

  return {
    apiEndpoint: apiEndpoint,
  };
};

export default getChatbotConfig;
