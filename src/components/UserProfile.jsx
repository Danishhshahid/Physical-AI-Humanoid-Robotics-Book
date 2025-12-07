import React from 'react';
import { useAuth, useUserProfile } from '../hooks/useAuth';
import PersonalizationService from '../services/PersonalizationService';
import styles from './UserProfile.module.css';

/**
 * UserProfile Component
 * Displays user information and personalization recommendations
 */
export function UserProfile() {
  const { user, signout } = useAuth();
  const userProfile = useUserProfile();

  if (!user) return null;

  const recommendations = userProfile
    ? PersonalizationService.getRecommendedContent(userProfile)
    : null;

  const handleSignout = async () => {
    await signout();
    window.location.href = '/';
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <h2>Welcome, {user.name}!</h2>
          <button onClick={handleSignout} className={styles.signoutBtn}>
            Sign Out
          </button>
        </div>

        <div className={styles.userInfo}>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Member Since:</strong> {new Date(user.joinedAt).toLocaleDateString()}
          </p>
        </div>

        {recommendations && (
          <>
            <div className={styles.section}>
              <h3>Your Learning Profile</h3>
              <div className={styles.profileDetails}>
                <div className={styles.detail}>
                  <span className={styles.label}>Software Background:</span>
                  <span>{userProfile.softwareBackground}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.label}>Hardware Background:</span>
                  <span>{userProfile.hardwareBackground}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.label}>Experience Level:</span>
                  <span>{userProfile.experience}</span>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3>Your Learning Difficulty</h3>
              <div className={styles.badge}>
                {recommendations.difficulty.charAt(0).toUpperCase() +
                  recommendations.difficulty.slice(1)}
              </div>
            </div>

            <div className={styles.section}>
              <h3>Recommended Focus Areas</h3>
              <div className={styles.tagList}>
                {recommendations.focusAreas.map(area => (
                  <span key={area} className={styles.tag}>
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h3>Recommended Modules</h3>
              <div className={styles.modulesList}>
                {recommendations.recommendedModules.map(module => (
                  <div key={module.id} className={styles.moduleCard}>
                    <div className={styles.moduleHeader}>
                      <h4>{module.title}</h4>
                      <span className={`${styles.priority} ${styles[module.priority]}`}>
                        {module.priority}
                      </span>
                    </div>
                    <p>{module.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h3>Your Learning Path</h3>
              <div className={styles.learningPath}>
                {recommendations.learningPath.map((phase, index) => (
                  <div key={index} className={styles.phase}>
                    <div className={styles.phaseNumber}>Phase {phase.phase}</div>
                    <div>
                      <h4>{phase.title}</h4>
                      <p className={styles.topics}>
                        Topics: {phase.topics.join(', ')}
                      </p>
                      <p className={styles.time}>⏱️ {phase.estimatedTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.bonusSection}>
              <div className={styles.bonusCard}>
                <h3>🎁 Bonus Points</h3>
                <p>
                  You've earned <strong>50 bonus points</strong> for completing signup and signin with
                  personal background information! This helps us personalize your learning experience.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
