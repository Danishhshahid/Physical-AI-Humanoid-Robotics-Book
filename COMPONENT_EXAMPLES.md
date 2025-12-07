# Component Usage Examples

## 1. Basic App Setup

### Root Layout with AuthProvider
```jsx
// src/theme/Root.jsx (or src/layouts/RootLayout.jsx)
import React from 'react';
import { AuthProvider } from '../components/AuthProvider';

export default function Root({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

## 2. Homepage Integration

### Complete Homepage with Auth
```jsx
// src/pages/index.js
import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { AuthModal } from '../components/AuthModal';
import { useAuth } from '../hooks/useAuth';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          🤖 Physical AI & Humanoid Robotics
        </h1>
        <p className={styles.heroSubtitle}>
          Free, Open-Source Textbook for Building AI-Powered Humanoid Robots
        </p>

        <div className={styles.heroButtons}>
          <Link
            className={styles.primaryButton}
            to="/docs/chapters/ch0-preface"
          >
            📖 Start Reading
          </Link>

          {user ? (
            <Link
              className={styles.secondaryButton}
              to="/profile"
            >
              👤 Your Profile
            </Link>
          ) : (
            <button
              className={styles.secondaryButton}
              onClick={() => setAuthModalOpen(true)}
            >
              🎁 Sign Up (Get 50 Bonus Points!)
            </button>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Free, open-source textbook for Physical AI and Humanoid Robotics"
    >
      <HomepageHeader />
      {/* Rest of homepage content */}
    </Layout>
  );
}
```

## 3. Protected Profile Page

### Profile Page with Auth Check
```jsx
// src/pages/profile.js
import React from 'react';
import Layout from '@theme/Layout';
import { UserProfile } from '../components/UserProfile';
import { useAuth } from '../hooks/useAuth';
import Link from '@docusaurus/Link';

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout title="Loading Profile">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Loading your profile...</h2>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="Sign In Required">
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h2>Please sign in to view your profile</h2>
          <p>Sign up to access personalized learning recommendations and earn bonus points!</p>
          <Link to="/" className="button button--primary">
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${user.name}'s Profile`}
      description="Your personalized learning profile"
    >
      <UserProfile />
    </Layout>
  );
}
```

## 4. Using Auth Hooks in Components

### Component with Auth Context
```jsx
// Example component that uses authentication
import React, { useEffect } from 'react';
import { useAuth, useUserProfile } from '../hooks/useAuth';
import PersonalizationService from '../services/PersonalizationService';

function MyComponent() {
  const { user, isAuthenticated, signout } = useAuth();
  const userProfile = useUserProfile();

  if (!isAuthenticated) {
    return <div>Please sign in to view this content</div>;
  }

  // Get personalized recommendations
  const recommendations = userProfile
    ? PersonalizationService.getRecommendedContent(userProfile)
    : null;

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      
      {recommendations && (
        <div>
          <h3>Your Learning Difficulty: {recommendations.difficulty}</h3>
          <h3>Recommended Modules:</h3>
          <ul>
            {recommendations.recommendedModules.map(module => (
              <li key={module.id}>
                {module.title} ({module.priority} priority)
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={signout}>Sign Out</button>
    </div>
  );
}

export default MyComponent;
```

## 5. Customizing the Personalization Service

### Add Custom Recommendation Logic
```jsx
// Extend PersonalizationService for custom recommendations
import PersonalizationService from '../services/PersonalizationService';

class CustomPersonalizationService extends PersonalizationService {
  static getCustomRecommendations(userProfile) {
    const baseRecommendations = this.getRecommendedContent(userProfile);

    // Add your custom logic
    const customResources = this.getCustomResources(userProfile);
    
    return {
      ...baseRecommendations,
      customResources,
    };
  }

  static getCustomResources(userProfile) {
    // Your custom logic here
    return [
      {
        title: 'Custom Tutorial',
        url: '/custom-tutorial',
        difficulty: userProfile.softwareBackground,
      },
    ];
  }
}

export default CustomPersonalizationService;
```

## 6. Adding Auth to Navigation Bar

### Update Navbar Component
```jsx
// If using Docusaurus navbar, you can add auth buttons
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from './Navbar.module.css';

function AuthNavbarItems() {
  const { user, signout } = useAuth();

  if (!user) {
    return (
      <li className="navbar__item">
        <a href="/" className="navbar__link auth-button">
          Sign In
        </a>
      </li>
    );
  }

  return (
    <li className="navbar__item dropdown">
      <a href="#" className="navbar__link">
        👤 {user.name}
      </a>
      <ul className="dropdown-menu">
        <li>
          <a href="/profile">View Profile</a>
        </li>
        <li>
          <button onClick={signout}>Sign Out</button>
        </li>
      </ul>
    </li>
  );
}

export default AuthNavbarItems;
```

## 7. Displaying Personalized Content

### Show Different Content Based on Background
```jsx
import React from 'react';
import { useUserProfile } from '../hooks/useAuth';
import PersonalizationService from '../services/PersonalizationService';

function ContentRenderer({ children }) {
  const userProfile = useUserProfile();

  if (!userProfile) {
    return <div>{children}</div>;
  }

  const contentAdaptation = PersonalizationService.getContentAdaptationGuidelines(userProfile);

  return (
    <div className={`content-${contentAdaptation.explanationLevel}`}>
      <div className={`code-style-${contentAdaptation.codeExampleStyle}`}>
        {children}
      </div>
    </div>
  );
}

export default ContentRenderer;
```

## 8. Creating a Personalized Module List

### Display Recommended Modules
```jsx
import React from 'react';
import { useUserProfile } from '../hooks/useAuth';
import PersonalizationService from '../services/PersonalizationService';
import styles from './ModuleList.module.css';

function PersonalizedModuleList() {
  const userProfile = useUserProfile();

  if (!userProfile) {
    return <div>Sign in to see personalized modules</div>;
  }

  const recommendations = PersonalizationService.getRecommendedContent(userProfile);

  return (
    <div className={styles.container}>
      <h2>Recommended Modules for You</h2>
      <p>Based on: {userProfile.softwareBackground} software background + {userProfile.hardwareBackground} hardware background</p>

      <div className={styles.moduleGrid}>
        {recommendations.recommendedModules.map(module => (
          <div key={module.id} className={styles.moduleCard}>
            <div className={styles.priority}>
              {module.priority.toUpperCase()}
            </div>
            <h3>{module.title}</h3>
            <p>{module.reason}</p>
            <a href={`/docs/modules/${module.id}`}>
              Start Learning →
            </a>
          </div>
        ))}
      </div>

      <div className={styles.learningPath}>
        <h2>Your Learning Path</h2>
        {recommendations.learningPath.map((phase, idx) => (
          <div key={idx} className={styles.phase}>
            <h4>Phase {phase.phase}: {phase.title}</h4>
            <p>{phase.topics.join(' • ')}</p>
            <small>{phase.estimatedTime}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalizedModuleList;
```

## 9. Progress Bar Component

### Show Learning Progress
```jsx
import React, { useState, useEffect } from 'react';
import { useUserProfile } from '../hooks/useAuth';

function LearningProgress() {
  const userProfile = useUserProfile();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (userProfile) {
      // Fetch user progress from API
      const calculateProgress = async () => {
        // Your progress calculation logic
        setProgress(25); // Example: 25% complete
      };
      calculateProgress();
    }
  }, [userProfile]);

  if (!userProfile) return null;

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Your Learning Progress</h3>
      <div style={{
        width: '100%',
        height: '30px',
        backgroundColor: '#e0e0e0',
        borderRadius: '15px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#0066cc',
          transition: 'width 0.3s ease'
        }}>
          <span style={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            fontWeight: 'bold'
          }}>
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default LearningProgress;
```

## 10. User Stats Dashboard

### Complete User Statistics
```jsx
import React from 'react';
import { useUserProfile } from '../hooks/useAuth';
import PersonalizationService from '../services/PersonalizationService';
import styles from './UserStats.module.css';

function UserStats() {
  const userProfile = useUserProfile();

  if (!userProfile) return null;

  const recommendations = PersonalizationService.getRecommendedContent(userProfile);

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statCard}>
        <h3>📊 Learning Difficulty</h3>
        <p className={styles.stat}>{recommendations.difficulty}</p>
      </div>

      <div className={styles.statCard}>
        <h3>🎯 Focus Areas</h3>
        <p className={styles.stat}>{recommendations.focusAreas.length} areas</p>
      </div>

      <div className={styles.statCard}>
        <h3>📚 Recommended Modules</h3>
        <p className={styles.stat}>{recommendations.recommendedModules.length} modules</p>
      </div>

      <div className={styles.statCard}>
        <h3>🏆 Bonus Points</h3>
        <p className={styles.stat}>50 points</p>
      </div>

      <div className={styles.interestsCard}>
        <h3>❤️ Your Interests</h3>
        <div className={styles.interestsList}>
          {userProfile.interests.map(interest => (
            <span key={interest} className={styles.interestTag}>
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserStats;
```

---

## Testing Examples

### Test Auth Functionality
```jsx
// In a test file
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../components/AuthProvider';
import SignupForm from '../components/SignupForm';

describe('Authentication', () => {
  test('signup form validates email', () => {
    render(
      <AuthProvider>
        <SignupForm onSuccess={jest.fn()} onToggle={jest.fn()} />
      </AuthProvider>
    );

    const emailInput = screen.getByPlaceholderText('you@example.com');
    const submitButton = screen.getByText('Next: Your Background');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });
});
```

---

These examples show how to integrate and use the authentication system throughout your Docusaurus site! 🚀
