import React, { useState } from 'react';
import { SignupForm } from './SignupForm';
import { SigninForm } from './SigninForm';
import styles from './Auth.module.css';

/**
 * AuthModal Component
 * Modal that handles both signup and signin with ability to toggle between them
 */
export function AuthModal({ isOpen, onClose, defaultMode = 'signup' }) {
  const [mode, setMode] = useState(defaultMode);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  const handleToggle = () => {
    setMode(mode === 'signup' ? 'signin' : 'signup');
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {mode === 'signup' ? (
          <SignupForm onSuccess={handleSuccess} onToggle={handleToggle} />
        ) : (
          <SigninForm onSuccess={handleSuccess} onToggle={handleToggle} />
        )}
      </div>
    </div>
  );
}
