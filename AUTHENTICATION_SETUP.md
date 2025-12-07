# Signup & Signin Integration with Personalization - Quick Start Guide

## 🎯 Overview
This guide shows you how to integrate the authentication and personalization system into your Docusaurus website. Users can sign up with their software and hardware background, and earn **50 bonus points** while receiving personalized content.

## 📋 What's Included

### Frontend Components
- ✅ **AuthProvider** - Global authentication state management
- ✅ **SignupForm** - Multi-step form with background questionnaire
- ✅ **SigninForm** - Email/password login
- ✅ **AuthModal** - Combines signup and signin in a modal
- ✅ **UserProfile** - Displays personalized dashboard

### Hooks
- ✅ `useAuth()` - Access authentication context
- ✅ `useIsAuthenticated()` - Check login status
- ✅ `useUserProfile()` - Get user profile data

### Services
- ✅ **PersonalizationService** - Recommendations engine

### Documentation
- ✅ Complete implementation guide
- ✅ Backend API reference

## 🚀 Quick Setup

### Step 1: Install Dependencies

```bash
npm install better-auth axios zustand
```

### Step 2: Create Root Layout Component

Create `src/layouts/RootLayout.jsx`:

```jsx
import React from 'react';
import { AuthProvider } from '../components/AuthProvider';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

### Step 3: Integrate AuthProvider in Docusaurus Config

Update `docusaurus.config.js`:

```javascript
const config = {
  // ... existing config ...
  
  customFields: {
    // Add custom fields if needed
  },

  // Add this to wrap your site with AuthProvider
  swizzleConfig: {
    dangerouslyDisableTrunkation: true,
  },
};
```

Or better, swizzle the Root component:

```bash
npm run swizzle @docusaurus/theme-classic Root -- --eject
```

Then update `src/theme/Root.jsx`:

```jsx
import React from 'react';
import { AuthProvider } from '../components/AuthProvider';

export default function Root({children}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

### Step 4: Add Auth Buttons to Homepage

Update `src/pages/index.js`:

```jsx
import React, { useState } from 'react';
import { AuthModal } from '../components/AuthModal';
import { useAuth } from '../hooks/useAuth';

function HomepageHeader() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header>
      {/* Existing header content */}
      
      <div className={styles.headerButtons}>
        {user ? (
          <div>
            Welcome, {user.name}!
            <Link to="/profile">View Profile</Link>
          </div>
        ) : (
          <button
            onClick={() => setAuthModalOpen(true)}
            className={styles.authButton}
          >
            Sign Up / Sign In (Get 50 Bonus Points!)
          </button>
        )}
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </header>
  );
}
```

### Step 5: Create Profile Page

Create `src/pages/profile.js`:

```jsx
import React from 'react';
import Layout from '@theme/Layout';
import { UserProfile } from '../components/UserProfile';
import { useAuth } from '../hooks/useAuth';
import { Redirect } from '@docusaurus/router';

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Redirect to="/" />;

  return (
    <Layout title="Your Profile" description="View your personalized learning profile">
      <UserProfile />
    </Layout>
  );
}
```

## 🔧 Backend Setup

See `API_IMPLEMENTATION.js` for a complete Express.js example.

### Quick Backend Integration:

1. **Create API endpoints** at:
   - `POST /api/auth/signup`
   - `POST /api/auth/signin`
   - `POST /api/auth/signout`
   - `GET /api/auth/me`
   - `PUT /api/auth/profile`

2. **Use environment variables**:
```env
# Frontend
REACT_APP_API_URL=http://localhost:5000

# Backend
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb://...
NODE_ENV=development
```

3. **Update API base URL** in `AuthProvider.jsx`:
```jsx
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_BASE;
```

## 📊 Personalization System

The system automatically recommends content based on user background:

### Background Levels
- **Software**: Beginner → Intermediate → Advanced → Expert
- **Hardware**: Beginner → Intermediate → Advanced → Expert

### Personalization Includes
- Content difficulty adjustment
- Module priority ranking
- Focus area recommendations
- Learning path generation
- Resource suggestions

### Adjusting Personalization

Edit `src/services/PersonalizationService.js`:

```javascript
// Example: Change module recommendations
static getRecommendedModules(softwareBackground, hardwareBackground, interests) {
  // Customize the recommendation logic here
}
```

## 🎮 Bonus Points System

### How It Works
- Users earn **50 points** for:
  - Completing signup ✓
  - Filling software background ✓
  - Filling hardware background ✓
  - Selecting interests ✓

### Displaying Points
Points automatically display in the `UserProfile` component with a celebration badge.

## 🎨 Customization

### Change Colors
Edit `Auth.module.css` and `UserProfile.module.css`:

```css
/* Change primary color from blue to your brand color */
.btn {
  background-color: #YOUR_COLOR; /* was #0066cc */
}
```

### Customize Form Fields
Edit `SignupForm.jsx`:

```jsx
const softwareOptions = [
  'Your custom option 1',
  'Your custom option 2',
  // Add more options
];
```

### Modify Recommendations Algorithm
Edit `PersonalizationService.js`:

```javascript
static calculateDifficulty(softwareBackground, hardwareBackground) {
  // Adjust scoring weights
}
```

## 🔐 Security Checklist

- ✅ Password minimum 8 characters
- ✅ HTTPS for production
- ✅ HTTP-only cookies
- ✅ CSRF protection on backend
- ✅ Input validation on both sides
- ✅ Secure JWT signing
- ✅ Environment variables for secrets

## 📱 Responsive Design

All components are fully responsive:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

## 🧪 Testing Checklist

- [ ] Signup with invalid email (should fail)
- [ ] Password < 8 chars (should fail)
- [ ] Passwords don't match (should fail)
- [ ] Valid signup (should succeed and redirect)
- [ ] Signin with wrong password (should fail)
- [ ] Valid signin (should succeed)
- [ ] Profile shows personalized content
- [ ] Signout clears session
- [ ] Session persists on refresh
- [ ] Mobile responsive
- [ ] Modal closes on background click
- [ ] Form validation shows errors

## 🚨 Common Issues

### Issue: "Cannot find module 'better-auth'"
**Solution**: Run `npm install better-auth axios zustand`

### Issue: API calls fail with CORS error
**Solution**: 
- Backend must have CORS enabled
- Check `API_BASE_URL` in `.env`
- Ensure credentials: true in axios calls

### Issue: User not persisting after page reload
**Solution**:
- Implement `checkAuthStatus()` on app mount (already in AuthProvider)
- Verify backend returns user on GET `/api/auth/me`
- Check cookie is being set (httpOnly, sameSite)

### Issue: Modal not opening
**Solution**:
- Ensure `AuthModal` state is being managed in parent
- Check `isOpen` prop is being passed correctly

## 📚 File Structure

```
src/
├── components/
│   ├── AuthProvider.jsx           # Auth state management
│   ├── AuthModal.jsx              # Modal wrapper
│   ├── SignupForm.jsx             # Signup form (2-step)
│   ├── SigninForm.jsx             # Signin form
│   ├── UserProfile.jsx            # Profile dashboard
│   ├── Auth.module.css            # Auth styling
│   └── UserProfile.module.css     # Profile styling
├── hooks/
│   └── useAuth.js                 # Auth hooks
├── services/
│   └── PersonalizationService.js  # Recommendation engine
└── pages/
    ├── index.js                   # Homepage with auth button
    └── profile.js                 # Profile page (protected)
```

## 🌐 Environment Variables

```env
# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000

# Backend (.env)
PORT=5000
JWT_SECRET=your-super-secret-key
MONGODB_URI=mongodb://localhost:27017/robotics-book
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## 🔗 Resources

- [Better-Auth Documentation](https://www.better-auth.com/)
- [Docusaurus Swizzling Guide](https://docusaurus.io/docs/swizzling)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

## 📞 Support

For issues or questions:
1. Check the `AUTHENTICATION_GUIDE.md` for detailed info
2. Review `API_IMPLEMENTATION.js` for backend setup
3. Check console for error messages
4. Verify all dependencies are installed

## ✨ Next Steps

1. ✅ Set up backend API endpoints
2. ✅ Integrate AuthProvider into app root
3. ✅ Add auth buttons to homepage
4. ✅ Test signup and signin flows
5. ✅ Customize colors and form fields
6. ✅ Deploy to production
7. ✅ Monitor and iterate on recommendations

## 🎓 Bonus Features to Consider

- OAuth integration (Google, GitHub)
- Email verification
- Password reset flow
- User profile editing
- Progress tracking
- Achievement badges
- Social sharing
- Content bookmarks

---

**Congratulations!** You now have a complete authentication and personalization system integrated into your Docusaurus site! 🎉
